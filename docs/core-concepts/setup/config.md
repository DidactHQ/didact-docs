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

Considering that Didact is a self-hosted tool, it is very possible that you may be targeting various environments in your infrastructure that require different settings, different secrets, different connection strings, and so on.

Rather than have you constantly resetting configuration settings in `didact.config.json`, managing multiple `didact.config.json` files, or doing some other hack, I have elected to instead provide config profile support.

Config profiles are uniquely named objects in a dictionary object **where each profile contains the actual Didact settings**. You can create multiple config profiles and save different settings to each profile. Then, in the config file, you elect to **activate** one config profile at a time.

::: tip
It's important to keep in mind, then, that config settings are actually saved specifically to config profiles.
:::

This is very convenient for you because you can easily create different profiles and easily swap back and forth between their settings. For example, you could make a `staging` profile for your Staging environment and a `production` profile for your Production environment.

To create a new config profile, run the [config-profile init](/api/didact-cli/config-profile-init) command.

To activate an existing profile, run the [config-profile activate](/api/didact-cli/config-profile-activate) command.

## Config contexts

In the case that you want to use special contextual data in the config file, Didact exposes a reserved config context syntax that you can use in the config file.

For example, you may want to access the machine name for the engine name, or you may want to use a database connection string that is saved as an environment variable on the machine. In both of these cases and more, you can access this data using config contexts.

::: danger
The config context strings must be typed **exactly as displayed below**, so I provided copyable codeboxes below to help you avoid accidental typos in your config. If you're manipulating your config file via a script, then just make sure you keep the spelling and spacing **exactly as shown below**.
:::

The available config contexts are listed below:

::: v-pre

- `${machineName}`
The machine name.

```bash
${machineName}
```

- `${username}`
The current username.

```bash
${username}
```

- `${env.SOME_VARIABLE}`
The environment variable named `SOME_VARIABLE`.

```bash
${env.SOME_VARIABLE}
```

- `${variables.some-variable}`
The [Didact variable](/core-concepts/variables) named `some-variable`.

```bash
${variables.some-variable}
```

- `${secrets.some-variable}`
The [Didact secret](/core-concepts/secrets) named `some-variable`.

```bash
${secrets.some-variable}
```

:::

## Config template

A `didact.config.json` JSON template file is shown below with the `default` config profile:

```json
{
    "$schema": "https://schemas.didact.dev/v1/didact.config.json",
    "activeProfile": "default",
    "profiles": {
        "default": {
            "Database": {
                "Provider": "<DB_PROVIDER_KEY>",
                "ConnectionString": "<DB_CONNECTION_STRING>"
            },
            "EncryptionKey": "<ENCRYPTION_KEY>",
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

The config settings for a profile are shown below:

::: info
For simplicity, when referencing these settings through Didact CLI commands, use the exact JSON key reference here such as `Database.Provider`.
:::

| Setting | Type | Description |
| --- | :---: | --- |
| `activeProfile` | string | The currently activated config profile. |
| `Database.Provider` | string | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice. |
| `Database.ConnectionString` | string | The connection string for the database. |
| `EncryptionKey` | string | The symmetric encryption key. |
| `LicenseKey` | string | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |
| `Engine.Name` | string | The name of the Didact Engine instance. |
| `UI.EngineBaseUrl` | string | The base URL of a target Didact Engine. |

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