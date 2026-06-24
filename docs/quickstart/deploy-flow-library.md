---
title: Deploy Flow Library
description:
---

# Deploy Flow Library

Now that `FlowLibrary` is created and Didact's applications are installed on your machine, it's time to generate a new deployment for `FlowLibrary` so that it can be consumed by Didact Engine.

## What is a deployment?

In short, think of a deployment as a **runtime-plugin equivalent** of a NuGet package. It's a packaged-up class library that is loaded in dynamically to Didact Engine.

Normally, when you need to add a class library dependency to a host app, you publish the class library as a NuGet package and add the NuGet package to the host app before compile time. However, taking this approach for background jobs has a swath of disadvantages, so instead Didact loads class libraries as runtime plugins.

::: info KISS
See [Flow Library](/core-concepts/architecture/flow-library) and [Didact Engine](/core-concepts/architecture/didact-engine) to learn more about the architecture and justification.
:::

## Deploy to filesystem

Since, for the Quickstart, you'll be running Didact's apps on your local dev machine, let's use the simple filesystem deployment source for `FlowLibrary`.

In your terminal, run the following [deploy filesystem command](/api/didact-cli/deploy-filesystem):

```bash
didact deploy filesystem --project FlowLibrary.csproj
```

where `--project` is the path to `FlowLibrary`'s `.csproj`.

::: info No `--path` param?
One nice optimization of the [deploy filesystem command](/api/didact-cli/deploy-filesystem) is that Didact automatically uses a default deployments filepath if the `--path` option is omitted.
:::

## Deployment workflow

So wait, why do we even need a deployment command in the first place? In short, because deployment commands like the one above drastically simplify what would otherwise be an unpleasant workflow for you.

::: warning Class library vs. host app
Remember, `FlowLibrary` is a **class library**, *not a host app*. This means that the class library needs to be nicely packaged up, placed somewhere discoverable, and consumed by Didact Engine in order for the flows inside to execute. This should look familiar because several ideas overlap with publishing NuGet packages, except in Didact we use **runtime plugins** instead.
:::

Deployment commands typically do the following:

1. Runs `dotnet publish` against your flow library to produce publish artifacts which primarily consist of the project's main `.dll` file.
2. Packages the publish artifacts into a zip folder.
3. Infers or resolves a [deployment name](/core-concepts/deployments/deployment-names) for your published flow library.
4. Moves the zip folder to the designated [deployment source](/core-concepts/deployments/deployment-sources), wherever that may be.
5. Creates new deployment metadata in the Didact database.

As you can see, that's an ugly workflow, so I'd rather have Didact take care of that for you! Once a deployment command runs successfully, a flow library is **discoverable** and **consumable** by Didact Engine.