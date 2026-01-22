# Deploy Flow Library

Now that `FlowLibrary` is created and Didact's applications are installed on your machine, it's time to create and push a new deployment for `FlowLibrary` so that it can be absorbed by Didact Engine.

## Choose deployment folder

For the simplicity of the Quickstart, we will use the filesystem [deployment source](/core-concepts/deployments/deployment-sources) to target a folder destination on your machine for `FlowLibrary` so that we know Didact Engine can access it.

::: info
Didact offers more than just the filesystem deployment source, but the filesystem deployment source is the easiest one to get started with.
:::

You can choose any folder that you would like, but for this example, we will choose a simple path like `C:\deployments`.

## Initialize deployment

First and foremost, we need to initialize the new deployment for `FlowLibrary` which will live in a `didact.deployments.json` file. We will name the deployment `flow-library` for the `default` [environment](/core-concepts/deployments/environments).

::: danger
The `didact.deployments.json` file is a deployment [house-keeping file](/core-concepts/deployments/deployments-file) that I **strongly recommend** you add to version control. This will allow you to `git clone` `FlowLibrary` to any machine and always have a record of what deployments `FlowLibrary` belongs to.
:::

I recommend having this file created in the same directory as `FlowLibrary`'s `.csproj` file, so open a terminal and navigate to that project directory.

Now, run the following [deployment init](/api/didact-cli/deployment-init) command below:

```bash
didact deployment init --name flow-library --environment default --entrypoint FlowLibrary.dll
```

This command will create a new `didact.deployments.json` file in `FlowLibrary`'s project directory with a new deployment created for `FlowLibrary`. 

### Entrypoint

Although this is the Quickstart, I want to quickly point out what the `--entrypoint` option was for. This CLI option tells the deployment what the name of `FlowLibrary`'s main `.dll` file is. When `FlowLibrary` is loaded into Didact Engine as a [runtime plugin](/core-concepts/architecture/flow-library#plugin-system), the plugins module needs to know the name of this entrypoint file.

::: tip
The standard naming convention that dotnet uses for class libraries is to name the class library's entrypoint `.dll` file after the main Assembly name. So if, for example, your class library is named `MyLibrary`, then your entrypoint `.dll` would be named `MyLibrary.dll`.
:::

::: danger
This filename needs to be **exactly right**, so make sure you type it in correctly to your CLI command. If you mess up the filename, then you can either manually edit the JSON in an editor or use the [deployment set](/api/didact-cli/deployment-set) command to change the filename.
:::

### Naming


One other thing to keep in mind regarding deployments: deployment names are unique **per environment**, but they are not globally unique.

As a result, in various deployment CLI commands, you will need to reference a deployment by both its name and its environment. I call this the **deployment qualified name** and it's format is `<environment>/<deployment>`.

So for this example, since we made a deployment named `flow-library` for the `default` environment, the deployment's qualified name would be `default/flow-library`.

## Set deployment source

Now we need to set the deployment's source. Since we are using the filesystem of your local machine, you need to run the [deployment source set filesystem](/api/didact-cli/deployment-source-set-filesystem) command.

```bash
didact deployment source set filesystem --path "C:\deployments\${environment}\${deployment}\${version}" --name default/flow-library
```

## Inspect deployment

Now run the [deployment inspect](/api/didact-cli/deployment-inspect) command to view the `didact.deployments.json` file:

```bash
didact deployment inspect
```

You should see output similar to what's below:

```json
{
    "$schema": "https://schema.didact.dev/v1/didact.deployments.json",
    "type": "dotnet class library",
    "entrypoint": "FlowLibrary.dll",
    "deployments": [
        {
            "deployment": "flow-library",
            "environment": "default",
            "version": "v1.0.0",
            "source": {
                "type": "filesystem",
                "path": "C:\\deployments\\${environment}\\${deployment}\\${version}"
            }
        }
    ]
}
```

## Create artifacts

Now that the deployment and deployments file has been setup, you need to publish `FlowLibrary` to create the library artifacts. Since we mentioned above that we are using the filesystem of your local machine to store deployments, let's use the `dotnet publish` command to publish `FlowLibrary` to the target folder.

However, pay careful attention to what we designated as the filesystem source in the `didact.deployments.json` file: notice that we used special [deployment contexts] as a template syntax in the path to make the path dynamic. In this case, we have the following values in `didact.deployments.json`:

- `deployment` = `"flow-library"`
- `environment` = `"default"`
- `version` = `"v1.0.0"`

Because that is how we specified the filesystem path for Didact Engine to find this deployment, we need to use this qualified path in the `dotnet publish` command.

Therefore, do the following:

1. Open a terminal and navigate to `FlowLibrary`'s root directory where the `.csproj` file is.
2. Publish your `FlowLibrary` to the deployment path by running the `dotnet publish` command below:

```bash
dotnet publish -o "C:\deployments\default\flow-library\v1.0.0"
```

::: warning
Notice that we had to type the `deployment contexts` into the `dotnet publish` command since dotnet has no knowledge of Didact.
:::

This command will send all publish artifacts for `FlowLibrary` to the target deployments folder - exactly what we want.

## Push deployment

Now that you have published `FlowLibrary`'s publish files to the target deployment folder, we need to push the deployment metadata up to Didact's database. Once we do, Didact Engine can immediately grab the new deployment and load it as a runtime plugin, making `SomeFlow` ready to run.

Run the [deployment push](/api/didact-cli/deployment-push) command to make this deployment available:

```bash
didact deployment push default/flow-library
```