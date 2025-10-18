# Install Didact CLI

To migrate the database and interact with the rest of the Didact platform, you need the Didact CLI.

## Installation

To install Didact CLI, you can use an install script from the [didact-install-scripts](https://github.com/DidactHQ/didact-install-scripts) repository directly in your terminal. There is an install script for Windows, Linux, and Mac OS, so simply copy and paste the appropriate script into your terminal and then execute the command.

You can also directly download the Didact CLI binary from the [Releases page](https://github.com/DidactHQ/didact/releases) of the main [Didact repository](https://github.com/DidactHQ/didact).

::: info
I am not currently planning to offer a Docker image for Didact CLI, but if users start requesting it, then I am happy to oblige.
:::

## Configure CLI settings

We need to provide, at a minimum, a connection string for Didact CLI to access the Didact database, so run the [didact config](/api/didact-cli/config) command below:

```bash
didact config --provider "<DB_PROVDER_KEY>" --connection-string "<DB_CONNECTION_STRING>"
```

Replace `<DB_PROVDER_KEY>` with a valid [database provider key](/core-concepts/architecture/metadata-database#database-providers) and `<DB_CONNECTION_STRING>` with a database connection string.

::: warning
As expounded upon below, Didact CLI needs a connection string with DDL privileges so that it can run migrations against the database. After migrations are ran, you don't necessarily have to keep using that same connection string: you can replace it with one that has lesser privileges. However, subsequent CLI operations will still need connection strings with CRUD privileges. You can read more in [metadata database](/core-concepts/architecture/metadata-database).
:::

## Run database migrations

If this is your first time using Didact on your given database, then you need to run the [didact migrate](/api/didact-cli/migrate) command against it to setup the data model. Open a terminal and run the following command to execute the database migrations:

```bash
didact migrate
```