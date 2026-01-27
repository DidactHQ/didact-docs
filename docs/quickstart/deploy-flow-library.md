# Deploy Flow Library

Now that `FlowLibrary` is created and Didact's applications are installed on your machine, it's time to generate a new deployment for `FlowLibrary` so that it can be consumed by Didact Engine.

## Choose deployment folder

For the simplicity of the Quickstart, we will use the filesystem [deployment source](/core-concepts/deployments/deployment-sources) to target a folder destination on your machine for `FlowLibrary` so that we know Didact Engine can access it.

::: info
Didact offers more than just the filesystem deployment source, but the filesystem deployment source is the easiest one to get started with.
:::

You can choose any folder that you would like, but for this example, we will choose a simple path like `C:\deployments`.

## Setup deployment

First, we need to initialize a new [deployments file](/core-concepts/deployments/deployments-file), `didact.deployments.json`. The deployments file will help us generate unique deployments whenever we are ready to publish `FlowLibrary` somewhere and make it available for consumption in Didact Engine.

::: warning
It is recommended to make the deployments file in the same directory as `FlowLibrary`'s `.csproj` file for easy reference. It is also **strongly recommended** to enter the deployments file into version control since it has some book-keeping data and assists with generating new deployments.
:::

The workflow we are following is outlined below:

1. Initialize a new deployments file.
2. Create a new deployment profile.
3. Set a deployment profile source.
4. Publish the class library's build files to the deployment source specified in the previous step.
5. Generate a new deployment from the deployment profile to let Didact know that your class library is ready for consumption into Didact Engine.

## Initialize deployments file

Run the following [deployment init](/api/didact-cli/deployment-init) command below:

```bash
didact deployment init --name FlowLibrary --artifact-entrypoint FlowLibrary.dll --artifact-version v1.0.0
```

Notice that `--artifact-entrypoint` is the main `.dll` file that the class library produces.

::: tip
The standard naming convention that dotnet uses for class libraries is to name the class library's entrypoint `.dll` file after the main Assembly name. So if, for example, your class library is named `MyLibrary`, then your entrypoint `.dll` would be named `MyLibrary.dll`.
:::

::: danger
This filename needs to be **exactly right**, so make sure you type it in correctly to your CLI command. If you mess up the filename, then you can either manually edit the JSON in an editor or use the [deployment set](/api/didact-cli/deployment-set) command to change the filename.
:::

Also notice that we assigned an `--artifact-version` to this new deployments file; though this is not strictly required, it is good practice to version your deployments, either manually or automatically with [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts), so I am introducing the practice here.

## Initialize deployment profile

To generate unique deployments for Didact, you must use [deployment profiles](/core-concepts/deployments/deployments-file#deployment-profiles) that you create inside of `didact.deployments.json`. Think of deployment profiles as templates for generating new, **unique** deployments.

Run the following [deployment-profile init](/api/didact-cli/deployment-profile-init) command below:

```bash
didact deployment-profile init --name default --environment default --deployment-name-format "${name}-${artifact.version}"
```

Very quickly, we need to discuss a few important details about this CLI command.

### Environment

Notice the `--environment` option.

This was necessary because a deployment profile is intrinsically tied to a [Didact environment](/core-concepts/environments). Each deployment profile must specify a target environment because every deployment is scoped to a specific environment.

### Deployment name format

Next, notice the **very important** `--deployment-name-format` option.

This is an **extremely important** setting to configure correctly for a deployment profile. Conceptually, deployments are intended to be **immutable snapshots** of background job source code similar to what you would do publishing multiple versions of a library to a package manager.

The difference here is that rather than adding a package from a package manager before compile time, we instead load compiled class libraries as runtime plugins. This affords you, the end user of Didact, a suite of powerful advantages such as a granting [always on](/core-concepts/architecture/didact-engine#always-on) functionality to Didact Engine.

::: tip
Notice also that we used [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts) in `--deployment-name-format` to make it easy for Didact CLI to auto-generate unique deployment names when a new deployment is generated. Again, this is intentional since every deployment must have a unique name.
:::

## Set deployment source

Now we need to set a deployment source for the new deployment profile so that Didact will know *where* and *how* to locate `FlowLibrary`. In this guide, since we are using the local filesystem of your machine, we will use the filesystem deployment source.

Run the following [deployment-profile-source set filesystem](/api/didact-cli/deployment-profile-source-set-filesystem) command below:

```bash
didact deployment-profile-source set filesystem --path "C:\\deployments\\${name}-${artifact.version}" --profile default
```

::: tip
Notice here that in the path of this deployment source, we used the exact same string from `--deployment-name-format` with the same [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts) to auto-adjust each new deployment's path to the deployment base name and artifact version.

I know it looks a little advanced for a Quickstart, but I want to encourage automation like this as early as possible so configurations like this are set-and-forget for you.
:::

## Inspect deployments file

Now let's review our work to make sure that the deployments file looks as we intended.

Run the [deployment inspect](/api/didact-cli/deployment-inspect) command below:

```bash
didact deployment inspect
```

You should see JSON output similar to below:


```json
{
  "$schema": "https://schema.didact.dev/v1/didact.deployments.json",
  "name": "FlowLibrary",
  "artifact": {
    "type": "dotnet-class-library",
    "entrypoint": "FlowLibrary.dll",
    "version": "v1.0.0"
  },
  "profiles": {
    "default": {
      "deploymentNameFormat": "${name}-${artifact.version}",
      "environment": "default",
      "source": {
        "type": "filesystem",
        "filesystem": {
          "path": "C:\\deployments\\${name}-${artifact.version}.zip"
        }
      }
    }
  }
}
```

## Create artifacts

Now that have setup the deployments file, a new deployment profile, and a deployment source, we need to actually publish `FlowLibrary` to the target source. *After* we put the publish artifacts in the target source, *then* we generate a new deployment to let Didact know where and how to find them.

That is the crucial ordering for generating new deployments:

1. Setup a deployment profile in preparation to generate a new deployment.
2. Publish the build artifacts to the target source.
3. Generate a new deployment *after* the artifacts have made it to the source.

Since `FlowLibrary` is just a dotnet class library, we can create publish files from it using the `dotnet publish` command. This will generate publish files for `FlowLibrary` that we will then take and move to the target filesystem path we defined above.

### dotnet publish

First, run the `dotnet publish` command from the dotnet CLI:

```bash
dotnet publish
```

This should generate publish files for `FlowLibrary` in a default publish location, likely `./bin/Release/netstandard2.1/publish`.

### Deployment package

Now we want to take these publish files, zip them into a `.zip` folder, and move them to the target path defined above. We have a convenient [deployment package](/api/didact-cli/deployment-package) command that can take all files from `FlowLibrary`'s publish folder, copy them into a `.zip` file, and move the `.zip` file to the target source:

```bash
didact deployment package --source ./bin/Release/netstandard2.1/publish --profile default
```

::: tip
You may be wondering: why do we need a special CLI command to basically zip up the publish folder when I could run a Powershell or Bash command instead? The answer is that this command can utilize the filesystem source we defined in the `default` deployment profile earlier to auto-generate the specific filename for this new deployment, utilizing the [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts) from the `--deployment-name-format` earlier, and auto-move the zip file to the target path.
:::

The output of this command should take all of `FlowLibrary`'s publish files, put them in a dynamically-named zip folder, and put them zip folder in the predetermind deployment source path.

## Generate new deployment

Finally, it's time to **generate** a new deployment! Once we do, Didact Engine can immediately grab the new deployment and load it as a runtime plugin making `SomeFlow` ready to run.

Run the following [deployment generate](/api/didact-cli/deployment-generate) command below specifying the `default` deployment profile that we made above:

```bash
didact deployment generate --profile default
```

This command will generate a new deployment with a unique name and save it to the Didact database. Once this occurs, Didact Engine - which automatically polls for missing deployments - will discover this new deployment and attempt to load it as a runtime plugin.