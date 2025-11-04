---
title: Create Flow Libraries
description:
---

<script setup>
const targetFrameworkVersion = import.meta.env.VITE_TARGET_FRAMEWORK_VERSION;
</script>

# Create Flow Libraries

Creating a new flow library is a pretty straightforward process, but there are a few steps that you need to take to execute a complete setup.

## Class library project

First and foremost, as discussed on the [Flow Library architecture page](/core-concepts/architecture/flow-library), a flow library is really just a normal dotnet class library. So to create a new flow library, you simply need to create a new dotnet class library.

The dotnet CLI provides a very easy way to do this. For example, to create a new flow library called `FlowLibrary`, run this command through the dotnet CLI:

```bash-vue
dotnet new classlib -o FlowLibrary -f {{ targetFrameworkVersion }}
```

## Add NuGet packages

Once your new flow library is created, you need to add a helper NuGet package to your class library called `Didact Core`. This package helps you to both configure your flow library and design your flows.

Run the following command in your terminal to add `Didact Core` as a dependency:

```bash
dotnet add package DidactCore
```

## Configure the csproj

Finally, you need to add a few configurations to your flow library's `.csproj` file. These configurations are required in order to make your flow library build versions as plugin-friendly as possible. Some of these configurations could be manually entered in the dotnet CLI by the `dotnet build` or `dotnet publish` commands, but, in my opinion, the commands become burdensome to type out after you add so many arguments and params.

Instead, I find that it is typically easier to add a set of project-level configurations in the `.csproj` file itself; that way, the `dotnet build` and `dotnet publish` commands will use those project-level settings by default and make your terminal calls more simple.

Please add the following configurations to your flow library's `.csproj` file:

```xml-vue
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>

        <TargetFramework>{{ targetFrameworkVersion }}</TargetFramework>
        <OutputType>Library</OutputType>
        <SelfContained>false</SelfContained>
        <GenerateRuntimeConfigurationFiles>false</GenerateRuntimeConfigurationFiles>
        <GenerateDependencyFile>false</GenerateDependencyFile>
        <CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
        <DebugType>none</DebugType>
        <DebugSymbols>false</DebugSymbols>
        <Optimize>true</Optimize>
        <Deterministic>false</Deterministic>

    </PropertyGroup>
</Project>
```