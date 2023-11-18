---
title: Class Library Project
---

# Create Flow Library

The magic of Didact's orchestration happens in your dedicated .NET class library project. This class library project contains your `Flows`, which are container classes for your background jobs/data pipelines/workflows. For simplicity, we will refer to it from here on out as the `Flow Library`.

::: tip
You can read more about `Flows` and other critical concepts in the Core Concepts section.
:::

## Create a Class Library Project

First, you need to create your `Flow Library`.

1. Open Visual Studio 2022.
2. Select `Create a new project` from the get started box on the right side.

<p align="center">
    <img src="./visual-studio-create-new-project.png" />
</p>

3. Type `class library` in the project types searchbar and select the `Class Library` project type.

<p align="center">
    <img src="./class-library-project-type-selection.png" />
</P>

4. Give a name to your new project. The name can be whatever you would like. For our example, we will use `Flows Library`.
5. When asked to choose a framework, please choose a .NET version that is .NET 2.1 compatible.

::: tip
In simple terms, that means to choose literally `.NET Standard 2.1` or `.NET 3.0+`. However, I would **strongly recommend** choosing a .NET version that is still supported by Microsoft.
:::

<p align="center">
    <img src="./visual-studio-project-dotnet-version.png" />
</p>

6. Once the project is loaded, add the `Didact Core` nuget package.

## Flow Organization

As you will see on the [Write a Flow](/quickstarts/write-a-flow) page, each `Flow` is a separate C# class. When your `Flows` are loaded into Didact Engine, they will be fetched using reliable methods from `System.Reflection`, so *technically*, you are free to organize your C# `Flow` classes as you see fit.

However, simply because it is the common standard in C#, I would recommend breaking your classes out into one class per `.cs` file.