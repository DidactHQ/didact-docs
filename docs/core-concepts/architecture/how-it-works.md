# How It Works

To help you fully understand how Didact works as a **platform**, I want to explain the overall Flow workflow here in a master, birds-eye-view document. Please read through the Core Concepts and Guides sections to learn more concrete details on how to use and configure the platform.

## Flow Library

### Create a class library

First and foremost, we have your Flow Library. This is a dedicated dotnet class library where you define your Flows. I have a helper NuGet package for you to use here called Didact Core that you simply add as a dependency to your class library.

Inside your Flow Library, you define your Flows and add any required dependencies, particularly for dependency injection. These dependencies could be other NuGet packages, references to other dotnet projects, embedded files, and so on.

### Build, Publish, and Deploy

Once your Flow Library is ready, you build and publish it to a specific location. This location can be as simple as a folder on your local machine; for example, normally class libraries build to a default folder in their project folder like `bin\Release\net8.0\publish`. Flow Libraries require special configurations in the .csproj file that grab all dependencies, including NuGet packages, and produce them all as outputs from the dotnet publish action.