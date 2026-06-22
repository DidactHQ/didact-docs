# Installation

To manipulate the Didact platform and use your flow library, you need to install several apps first.

::: info KISS
If you would like to see a more in-depth, technically-expressive installation guide, then feel free to read the [Installation setup page](/core-concepts/setup/installation).
:::

## Spin up database

First, Didact requires a database as it is a highly-relational orchestrator, so you need to spin up a new database instance for Didact. See [database providers](/core-concepts/architecture/metadata-database#database-providers) for a list of what databases are supported.

::: warning Keep it separate, keep it safe
A pre-existing database can be used if necessary, but it's my general recommendation to spin up a dedicated database since it will house significant metadata and track its own migrations.
:::

## Install Didact CLI

Now you need to install Didact CLI, the central utility tool to help you manage the rest of the Didact platform.

You can install Didact CLI by using the provided installer scripts below:

::: code-group

```powershell [Windows]
iex https://install.didact.dev/windows | irm
```

```bash [Mac]
curl https://install.didact.dev/mac
```

```bash [Linux]
curl https://install.didact.dev/linux
```
:::

Ensure that the installation was successful by running the [version command](/api/didact-cli/version) below:

```bash
didact version
```

## Setup config

Now you need to setup the [didact config file](/core-concepts/setup/config), named `didact.config.json`, and save the database settings to run migrations.

First, run the [config init command](/api/didact-cli/config-init):

```bash
didact config init
```

Next, set the [database provider key](/core-concepts/architecture/metadata-database#database-providers) and database connection string with the [config set command](/api/didact-cli/config-set) below:

```bash
didact config set Database.Provider db-provider-key
```

```bash
didact config set Database.ConnectionString "your-conn-string"
```

Ensure that your config settings were saved successfully by running the [config inspect command](/api/didact-cli/config-inspect):

```bash
didact config inspect
```

## Run migrations

Now you need to run migrations against your database instance. Run the following [database migration command](/api/didact-cli/migrate):

```bash
didact migrate
```

## Install engine and UI

Next, install both Didact Engine and Didact UI with the [install command](/api/didact-cli/install):

```bash
didact install
```