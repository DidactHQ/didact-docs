# How It Works

To help you fully understand how Didact works as a **platform**, I want to explain the overall Flow workflow here in a master, birds-eye-view document. Please read through the Core Concepts and Guides sections to learn more concrete details on how to use and configure the platform.

## Metadata database

### Create a database service

First off, stand up a database service. This can be as simple as a local database running on your machine or a cloud database.

### Install Didact CLI

Next, install Didact CLI. You can use an install script from the [didact-install-scripts](https://github.com/DidactHQ/didact-install-scripts) repository directly in your terminal. There is an install script for Windows, Linux, and Mac OS, so simply copy and paste the appropriate script into your terminal and then execute the command.

You can also directly download the Didact CLI binary from the [Releases page](https://github.com/DidactHQ/didact/releases) of the main [Didact repository](https://github.com/DidactHQ/didact).

::: info
I am not currently planning to offer a Docker image for Didact CLI, but if users start requesting it, then I am happy to oblige.
:::

### Setup CLI config

### Run database migration

Upon installing Didact CLI, run the following command in your terminal:

```bash
didact database migrate --provider "SQLServer" --connection-string "<YOUR_CONNECTION_STRING>"
```
Replace `<YOUR_CONNECTION_STRING>` with your actual database connection string.

::: warning
This CLI command will run SQL DDL statements against your database, so make sure to use a connection that grants DDL privileges. After you run the migrations and launch Didact Engine, you can define a different connection string - one with lesser privleges - for Didact Engine's normal operations.
:::

## Flow Library

### Create a class library

Now we have your Flow Library. This is a dedicated dotnet class library where you define your Flows. I have a helper NuGet package for you to use here called Didact Core that you simply add as a dependency to your class library.

Inside your Flow Library, you define your Flows and add any required dependencies, particularly for dependency injection. These dependencies could be other NuGet packages, references to other dotnet projects, embedded files, and so on.

### Build and Publish

Once your Flow Library is ready, you build and publish it to a specific location. This location can be as simple as a folder on your local machine; for example, normally class libraries build to a default folder in their project folder like `bin\Release\net8.0\publish`. Flow Libraries require special configurations in the .csproj file that grab all dependencies, including NuGet packages, and produce them all as outputs from the dotnet publish action.

### Create a deployment

## Didact Engine

### Installation

You can install Didact Engine by running the [engine install command] from the Didact CLI, by downloading the binary from the [Releases page](https://github.com/DidactHQ/didact/releases) of the main [Didact repository](https://github.com/DidactHQ/didact) on GitHub, or by pulling its Docker image.

### Setup engine config

Didact Engine is a self-contained dotnet executable that requires an `enginesettings.json` file for a few application settings and/or environment variable declarations.

## Didact UI

### Installation

You can install Didact UI by running the [ui install command] from the Didact CLI, by downloading the binary from the [Releases page](https://github.com/DidactHQ/didact/releases) of the main [Didact repository](https://github.com/DidactHQ/didact) on GitHub, or by pulling its Docker image.

### Setup UI config

Didact UI is a self-contained dotnet executable that requires an `uisettings.json` file for a few application settings and/or environment variable declarations.