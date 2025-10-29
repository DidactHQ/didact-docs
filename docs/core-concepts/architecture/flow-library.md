---
title: Flow Library
description: A flow library is the dotnet class library project where you define your flows. A flow library contains your flow source code, Fflow dependencies, and gets loaded into Didact Engine as a runtime plugin.
---

# Flow Library

And finally, we arrive at the user-facing component of the Didact platform: a Flow Library.

## Class Library Project

A flow library is a [dotnet class library project](https://learn.microsoft.com/en-us/dotnet/standard/class-libraries), meaning that its build artifacts are *not* executable files but rather .dll files and package dependency files.

Class libraries are incredible projects to utilize in the dotnet ecosystem. Their source code files generate the basis for nuget packages, and they are incredibly easy to add to other dotnet projects, either via nuget references or via project references in a .csproj file.

## Plug and Play

A flow library is the one exception to Didact's otherwise default plug-and-play approach to deployment. While the rest of Didact's applications are meant to be used as is, flow libraries are intended to be your playground for defining all things related to your Flows. Heavy modification is both expected and required.

## How Many?

You can have as many flow libraries as you want! Originally, I had designed Didact to use only one flow library at a time, but I felt there were use cases where multiple flow libraries were warranted. And indeed, after talking to users, I was correct.

So if you want to have one flow library or a hundred flow libraries, that is completely fine!

## Flow Dependencies

As you are designing your flows inside of a flow library, any dependencies that your flows require need to be added to the flow library. Among the various responsibilites that a class library project has, one of them is managing dependencies.

::: tip Tip of the spear
The behavior and responsibilities of class library projects played **the most critical role** in helping me decide the architecture of the Didact platform. I realized that the most convenient, most sensible place to define flows and manage their dependencies was in a dedicated class library project.
:::

## Plugin System

What may come as a surprise to you is *what to do with a flow library*.

Since Didact Engine is responsible for reading, loading, and executing your flow library and synchronizing it with the metadata database, you might be tempted to think that you should add the Flow Library as a reference in Didact Engine's .csproj file. Or perhaps you might think you need to publish your flow library to an internal, private nuget server and than add that private nuget package as a dependency to Didact Engine.

However, you would be wrong on both accounts. And this is where the novelty and unusual nature of Didact's architecture comes into play. Because yes, Didact Engine *does* in fact need access to your flow library, but it accomplishes this in a way completely different from existing dotnet background job libraries:

Your flow library is loaded into Didact Engine *at runtime* as a **plugin**.

### At Runtime

Yes, you read that correctly: your flow library is added to Didact Engine at runtime.

This means that Didact Engine has no nuget references nor project references to your class library in its .csproj file. It also means that your flow library is not known to the C# compiler at build time when Didact Engine is created, and it is not present to the dependency injection container nor anything else in Didact Engine at application startup.

Your flow library is added *exclusively* at runtime, meaning any point in time after Didact Engine has completed its startup process and is actively running.

### Plugin

While this might sound crazy, in reality it is not. The authors of dotnet have conveniently provided us classes, interfaces, and other such constructs to accomplish dynamic runtime scenarios like this.

The problem is that very few people in the dotnet ecosystem ever discuss this, let alone know of it. Why *are* class library plugins so seldom discussed in dotnet? I really don't know, but maybe Didact can help bring this to light.

In order to build a system like this, you need a deep understanding of dotnet's dependency injection system (`IServiceCollection` and `IServiceProvider`, among others), dotnet's startup process, the implicit constraints of `System.Reflection`, the behavior of the `AssemblyLoadContext` class, resolving types in assembly resolvers, configuring plugin-localized dependency injection containers, and more.

**It. Is. Extremely. Complicated.**

Take my word for it as the one responsible for building this all into Didact. It took me over a year and a half to conceptualize the inner mechanics of these plugins and all of the extra bells and whistles that I needed from them.