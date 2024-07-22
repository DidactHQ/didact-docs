---
title: Class Library Project
---

<script setup>
const targetFrameworkVersion = import.meta.env.VITE_TARGET_FRAMEWORK_VERSION;
</script>

# Create Flow Library

The magic of Didact's orchestration happens in your dedicated .NET class library project. This class library project contains your `Flows`, which are container classes for your jobs. For simplicity, we will refer to it from here on out as the `Flow Library`.

These instructions will utilize the [dotnet CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/) for cross-platform support, but you are welcome to use Visual Studio if you are more comfortable with it.

## Create class library project

First, you need to create your `Flow Library`.

1. Open a terminal on your machine.
2. In the terminal, type the following command:

```bash-vue
dotnet new classlib -o FlowLibrary -f {{ targetFrameworkVersion }}
```

::: tip What is this?
This command will create a new class library project for you. The `-o` command specifies the project name and folder name, and the `-f` specifies the target framework version.
:::

::: warning Why not .NET Standard 2.1?
If you are familiar with class library projects, you may be puzzled as to why you need to specify `{{ targetFrameworkVersion }}` as the target framework version rather than `netstandard2.1`. This is explained later in the docs (see Plugins), but for the moment, just know that this is both **intentional** and **required**.
:::

3. Navigate to the folder containing your new class library project with the following command:

```bash
cd FlowLibrary
```

4. Now add the `DidactCore` nuget package with the following command:

```bash
dotnet add package DidactCore
```

## Flow organization

As you will see on the [Write a Flow](/quickstarts/write-a-flow) page, each `Flow` is a separate C# class. When your `Flows` are loaded into Didact Engine, they will be fetched using tools like `System.Reflection`, so *technically*, you are free to organize your C# `Flow` classes as you see fit. However, simply because it is the common practice in C# to do so, I would recommend breaking your classes into one class per `.cs` file.

Additionally, if you are going to have other helper interfaces, classes, methods, or anything else inside of `Flow Library`, I would recommend making a `Flows` directory inside of the library to store all of your Flows in one, easy to find location.

::: tip
This is **not** a requirement from Didact; I'm just trying to help you stay organized.
:::

## Version Control

This is discussed in greater detail within the Core Concepts section of the docs, but since your `Flows` are contained within a class library project, is is extremely easy for you to add version control - just the same as you would any other class library project! This is one of the primary benefits of having your `Flows` decoupled from the applications and other architecture within the Didact Platform.