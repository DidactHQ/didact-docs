# Config

Didact's apps, namely, the CLI, the Engine, and the UI, are all build once, deploy anywhere applications whose behaviors are modified through a central configuration file. This configuration file can be thought of as a set of app settings and runtime environment variables for Didact's apps.

## Config file

To provide important environment variables and app settings for Didact CLI, you need a `didact.config.json` file. This is similar to an `appsettings.json` or `.env` file that you would find in a standard dotnet project. All three of Didact's apps use the config file, so it's very important that you initialize it and configure any necessary settings.

::: info
Originally, I was going to have a separate config file for each individual Didact app, but I later decided that was too tedious. I would rather provide one, simple, unified config file that you can easily reuse, initialize, or pass around however you need to.
:::

When initialized, the config file is created in Didact CLI's default installation folder for easy access.

## Config commands

To create `didact.config.json`, use the [config init](/api/didact-cli/config-init) command. This command will also create and activate a default config profile for you.

To populate or edit a specific setting in `didact.config.json`, use the [config set](/api/didact-cli/config-set) command.

To see the current values inside `didact.config.json`, use the [config inspect](/api/didact-cli/config-inspect) command.

## Config profiles

Todo

## Config contexts

In the case that you want to use special contextual data in the config file, Didact exposes a reserved config context syntax that you can use in the config file.

For example, you may want to access the machine name for the engine name, or you may want to use a database connection string that is saved as an environment variable on the machine. In both of these cases and more, you can access this data using config contexts.

::: danger
The config context strings must be typed **exactly as displayed below**, so I provided copyable codeboxes below to help you avoid accidental typos in your config. If you're manipulating your config file via a script, then just make sure you keep the spelling and spacing **exactly as shown below**.
:::

The available config contexts are listed below:

::: v-pre

- `{{ machineName }}`
The machine name.

```bash
{{ machineName }}
```

- `{{ username }}`
The current username.

```bash
{{ username }}
```

- `{{ env:SOME_VARIABLE }}`
The environment variable named `SOME_VARIABLE`. As you can see, the syntax is to prefix `env:` followed by the environment variable name.

```bash
{{ env:SOME_VARIABLE }}
```

:::

## Config template

A `didact.config.json` JSON template file is shown below with the `default` config profile:

```json
{
    "$schema": "https://schema.didact.dev/config/v1",
    "activeProfile": "default",
    "profiles": {
        "default": {
            "Database": {
                "Provider": "<DB_PROVIDER_KEY>",
                "ConnectionString": "<DB_CONNECTION_STRING>"
            },
            "Environment": "<ENVIRONMENT_NAME>",
            "LicenseKey": "<LICENSE_KEY>",
            "Engine": {
                "Name": "<ENGINE_NAME>"
            },
            "UI": {
                "EngineBaseUrl": "<BASE_URL>"
            }
        }
    }
}
```

## Config settings

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