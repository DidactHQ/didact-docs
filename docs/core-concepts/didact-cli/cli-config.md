# CLI Config

Since Didact CLI is a build once, deploy anywhere application, its behaviors are modified through a simple configuration file. This configuration file can be thought of as a set of runtime environment variables for Didact CLI.

## cliconfig.json

To provide important environment variables and app settings for Didact CLI, you need a `cliconfig.json` file. This is similar to an `appsettings.json` file that you would find in a standard dotnet project.

## cliconfig.json path

The `cliconfig.json` file is created at a default location that Didact CLI searches for upon execution.

## cliconfig.json template

A `cliconfig.json` JSON template file is shown below:

```json
{
    "Database": {
        "Provider": "<DB_PROVIDER_KEY>",
        "ConnectionString": "<DB_CONNECTION_STRING>"
    },
    "Environment": "<ENVIRONMENT_NAME>",
    "LicenseKey": "<LICENSE_KEY>"
}
```

## cliconfig.json key matrix

The config keys are shown below in a matrix.

::: info
For simplicity, when referencing these keys through Didact CLI commands, use the exact JSON key reference here such as `Database.Provider`. It makes the CLI commands slightly ugly, but it avoids unproductive aliasing work on my part for the moment.
:::

| JSON and CLI key name | Key value type | Key value description |
| --- | :---: | --- |
| `Database.Provider` | string | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice. |
| `Database.ConnectionString` | string | The connection string for the database. |
| `Environment` | string | The name of the default environment that you want to use. |
| `LicenseKey` | string | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |

### LicenseKey

::: info
A license key is only required for Didact customers who purchase a subscription. Free users who use the Community edition of Didact can ignore this field.
:::

<!-- ## cliconfig keys

### Database.Provider TEXT

- key: `Database.Provider`
- type: string
- description: The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice.
- required: false
- default: `SQLServer`

### Database.Provider

| Descriptor | Value |
| --- | --- |
| Key         | `Database.Provider` |
| Type        | string |
| Description | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice. |
| Required    | `true` |
| Default     | `SQLServer` |

### Database.ConnectionString

| Descriptor | Value |
| --- | --- |
| Key         | `Database.ConnectionString` |
| Type        | string |
| Description | The connection string for the database. |
| Required    | `true` |
| Default     | N/A |

### Environment

| Descriptor | Value |
| --- | --- |
| Key         | `Environment` |
| Type        | string |
| Description | The name of the default environment that you want to use. |
| Required    | `false` |
| Default     | `Default` |

### LicenseKey

| Descriptor | Value |
| --- | --- |
| Key         | `LicenseKey` |
| Type        | string |
| Description | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |
| Required    | `true` for customers only |
| Default     | N/A |

::: warning For customers only
If you are not a Didact customer / only use the Community Edition, you can omit this field. If you *are* a Didact customer, make sure to include this license key or else your enhanced features may not be unlocked.
::: -->