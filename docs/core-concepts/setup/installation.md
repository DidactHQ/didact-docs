# Installation

First and foremost, recall that Didact is a self-hosted tool that you setup on your own/your company's infrastructure. Perhaps a cloud version of Didact will be offered sometime in the future, but for now it's strictly self-hosted.

Didact offers a family of applications to operate the platform, namely, a CLI, an engine, and a UI. Didact also requires a database connection to run migrations against and orchestrate metadata inside of for operation and analytics. In this page, we will explore how to setup Didact.

::: tip
All of Didact's apps - the CLI, the engine, and the UI - have cross-platform, self-contained, single-file binaries available on Windows, Mac, and Linux, both for 64-bit and arm64 processor architectures. They are stateless, highly-portable apps designed to make self-hosting and scaling as simple as possible.
:::

## Database

First and foremost, Didact requires a database connection, so you need to spin up a new database instance for Didact. See [database providers](/core-concepts/architecture/metadata-database#database-providers) for a list of what databases are supported.

Didact was designed to be run as a standalone service vs. other background job systems that are libraries you add to your main web app. As such, I would recommend using a dedicated database just for Didact, but you don't *have* to do that if you'd prefer to use a pre-existing database. Just keep in mind that Didact utilizes a great deal of metadata, so you may not want it interferring with database connections from your main application.

## Install Didact CLI

The first application that you need to install is Didact CLI. Didact CLI is a powerful utility tool that I have provided to help you manage flow libraries, deployments, metadata, and the other Didact apps.

You can install Didact CLI by using the provided installer scripts below:

::: code-group

```powershell [Windows]
iex
```

```bash [Mac]
curl
```

```bash [Linux]
curl
```
:::

These installer scripts will detect your OS and processor architecture and download the corresponding latest binary from the [main GitHub repo](https://github.com/DidactHQ/didact). The scripts will also register Didact CLI to your PATH so that you can easily call it in terminal commands with `didact`.

::: warning
If you're concerned about what these scripts are doing, feel free to inspect their URLs for yourself. They are just simple installer/bootstrapper scripts.
:::

If you prefer not to use the installer scripts, then you'll need to go to the [latest Release page](https://github.com/DidactHQ/didact/releases/latest) on the GitHub repo and download the appropriate Didact CLI binary. However, Didact CLI is intended to be heavily used to manage the Didact platform, so don't forget to register Didact CLI to your PATH.

::: tip
I do not currently code sign Didact's app binaries, but I do provide a checksum file on the GitHub releases so that you can always verify a binary's integrity. If you have a warning message appear when trying to install or run these binaries, just ignore it. And remember, all the code is inspectable in the [main GitHub repo](https://github.com/DidactHQ/didact) if you have any concerns!
:::

## Setup config

Next you need to setup the Didact config file, `didact.config.json`. There is a dedicated [config page](/core-concepts/setup/config) and corresponding CLI commands in the API docs for you to fully learn the config, but on this page we will just do the bare minimum to expedite setup.

First, verify that you have Didact CLI successfully installed and registered to PATH.

```bash
didact version
```

Then, initialize the config file. This command will create a `didact.config.json` file in the default config directory and create and activate a default [config profile](/core-concepts/setup/config#config-profiles) for you.

```bash
didact config init
```

Now that we have a config file and config profile activated, we need to set a database provider and database connection string to run migrations. Run the following commands below, where `<DB_PROVIDER_KEY>` is your chosen [database provider key](/core-concepts/architecture/metadata-database#database-providers) and `<DB_CONNECTION_STRING>` is your database connection string:

```bash
didact config set Database.Provider <DB_PROVIDER_KEY>
```

```bash
didact config set Database.ConnectionString <DB_CONNECTION_STRING>
```

::: tip
If you prefer not to expose your database connection string and instead store it as an environment variable, for example, then you can access it via a [config context](/core-concepts/setup/config#config-contexts).

For example, if you save your connection string as an environment variable named `DIDACT_DB_CONN_STRING`, then you can reference it in the config file like below using the environment config context:

```bash
didact config set Database.ConnectionString "{{ env:DIDACT_DB_CONN_STRING }}"
```
:::

## Run migrations

Once the config is setup and you configure the database connection settings, you need to run migrations against the database instance.

Run the [database migration command](/api/didact-cli/migrate) below:

```bash
didact migrate
```

## Install engine and UI

Now that you have Didact CLI installed and migrations ran, you need to install the other two Didact applications: Didact Engine and Didact UI. Run the unified installer command below:

```bash
didact install
```

This will install both Didact Engine and Didact UI to your machine.

::: tip
If you only want to install one of the applications, you can run `didact install engine` or `didact install ui`.
:::

## Engine config

For Didact Engine to run, there are a few required settings that you must configure first. The recommended configurations are below:

Set the engine name.

```bash
didact config set Engine.Name my-engine
```

## UI config

For Didact UI to run, there are a few required settings that you must configure first. The recommended configurations are below:

Set the engine base URL:

```bash
didact config set UI.EngineBaseUrl "some-base-url"
```

## Start applications

Finally, to run the applications, use the respective [start command](/api/didact-cli/start).

To run Didact Engine:

```bash
didact start engine
```

To run Didact UI:

```bash
didact start ui
```

## Rationale

::: info
This section explains the founder's rationale behind the content described above. It is not required to use Didact, but it may enhance your understanding.
:::

### Migrations

Initially, I was going to have Didact Engine automigrate the database upon startup, but after much reflection, I realized that probably wasn't the best step forward since it's highly possible you could run multiple instances of Didact Engine. In a multi-engine scenario, we would not want multiple Didact Engine instances competing against each other to run the same database migrations; in my opinion, that's just asking for database corruption.

Another option would have been some kind of migration coordination logic, like a leader election algorithm among multiple Didact Engine instances, but, again, that was a headache that didn't seem worth solving.

Instead, to make scaling and clustering multiple Didact Engine instances as simple as possible, and also since database migrations are not something that you should be running very often, I felt a dedicated CLI command was the better approach.