---
title: Didact Core
description: Didact Core is the primary nuget package that you add to your Flow Library project. Didact Core contains important interfaces, classes, and other C# constructs that allow you to build powerful Flows.
---

# Didact Core

Here we discuss the motivations for creating Didact Core.

## Nuget Package

In order to create your Flows, you need to implement certain interfaces, utilize certain classes, and perform other such C# actions that build out your Flow Library. The easiest way to help you accomplish this is by providing you a free, easy-to-access nuget package: Didact Core.

This is covered in the Quickstarts section, but the easiest way to add Didact Core is via the dotnet CLI:

```bash
dotnet add package DidactCore
```

## Flow Library

Ultimately, Didact Core is a nuget package that you add to your **Flow Library project**.

Remember, one of the design points behind Didact is its plug-and-play nature: the only project that you are *supposed to modify* is the Flow Library itself. Otherwise, Didact Engine and Didact UI get deployed as is with minimal to no configurations required on your part.

## Common Namespaces

Some common namespaces that you'll need to use are listed below:

* `using DidactCore`
* `using DidactCore.Flows`
* `using DidactCore.Constants`