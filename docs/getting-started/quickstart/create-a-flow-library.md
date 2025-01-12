---
title: Create A Flow Library
description:
---

<script setup>
const targetFrameworkVersion = import.meta.env.VITE_TARGET_FRAMEWORK_VERSION;
</script>

# Create a Flow Library

The heart of the Didact Platform are your jobs which we call `Flows`. The Flows must exist in a dedicated class library project which we will call your `Flow Library` going forward. In this guide, I walk you through how to create and prepare a class library for Flow design.

## New class library project

To get started, you first need to create a new, dedicated class library dotnet project.

We will utilize the [dotnet CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/) for easy, cross-platform usage; however, feel free to use Visual Studio or any other IDE of your choice if you prefer a GUI over a CLI.

1. Open a terminal on your machine.
2. In the terminal, type the following command:

```bash-vue
dotnet new classlib -o FlowLibrary -f {{ targetFrameworkVersion }}
```

::: tip What is this?
This command will create a new class library project for you. The `-o` command specifies the project name and folder name, and the `-f` specifies the target framework version.
:::

::: warning Target framework version
If you are familiar with class library projects, you may be puzzled as to why you need to specify `{{ targetFrameworkVersion }}` as the target framework version rather than a .NET Standard version like `netstandard2.1`. This is explained later in the docs (see Plugins), but for the moment, just know that this is both **intentional** and **required**.
:::

3. Now navigate inside your new project folder:

```bash
cd FlowLibrary
```

## Add NuGet packages

In order to create your Flows, you need Didact's NuGet packages. Specifically, you need to add one NuGet package called `Didact Core`.

Run the following command to add Didact Core as a NuGet package dependency in your new class library:

```bash
dotnet add package DidactCore
```