# Engine Config

Since Didact Engine is a build once, deploy anywhere application, its behaviors are modified through a simple configuration file. This configuration file can be thought of as a set of runtime environment variables for Didact Engine.

## engineconfig.json

To provide important environment variables and app settings for Didact Engine, you need an `engineconfig.json` file. This is similar to an `appsettings.json` file that you would find in a standard dotnet project.

## engineconfig.json path

The `engineconfig.json` file must exist in the same root directory as the Didact Engine binary/executable. By default, the [engine install command](/api/didact-cli/engine-install) and [engine config init command](/api/didact-cli/engine-config-init) from the Didact CLI will autoinstall and autocreate the Didact Engine binary/executable and the `engineconfig.json` file in the same default directory to ensure that the two are next to each other.

::: danger
If you install Didact Engine somewhere other than its default install location, then you must ensure that an `engineconfig.json` file is created in the same directory for Didact Engine to read.
:::

## engineconfig.json CLI commands

To create the `engineconfig.json` file, use the [engine config init](/api/didact-cli/engine-config-init) command.

To populate or edit the `engineconfig.json` file, use the [engine config set](/api/didact-cli/engine-config-set) command.

To see the current values inside the `engineconfig.json` file, using the [engine config inspect](/api/didact-cli/engine-config-inspect) command.

## engineconfig.json template

A `engineconfig.json` JSON template file is shown below:

```json
{
    "Database": {
        "Provider": "<DB_PROVIDER_KEY>",
        "ConnectionString": "<DB_CONNECTION_STRING>"
    },
    "EngineApiKey": "<ENGINE_API_KEY>",
    "LicenseKey": "<LICENSE_KEY>"
}
```

<!-- TODO Other engine config 

    "EngineTuningName": "Default",
    "FlowVariables": {
        "Public": {
            "PublicVariable1": "publicvalue1"
        },
        "Secret": {
            "SecretVariable1": "secretvalue1"
        }
    } -->


## engineconfig.json key matrix

The config keys are shown below in a matrix.

::: info
For simplicity, when referencing these keys through Didact CLI commands, use the exact JSON key reference here such as `Database.Provider`. It makes the CLI commands slightly ugly, but it avoids unproductive aliasing work on my part for the moment.
:::

| JSON and CLI key name | Key value type | Key value description |
| --- | :---: | --- |
| `Database.Provider` | string | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice. |
| `Database.ConnectionString` | string | The connection string for the database. |
| `EngineApiKey` | string | The user-defined API key to protect Didact Engine with authentication. |
| `LicenseKey` | string | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |

### EngineApiKey

::: danger
Please be aware that if you omit this setting, then Didact Engine's API routes will be unprotected.
:::

### LicenseKey

::: info
A license key is only required for Didact customers who purchase a subscription. Free users who use the Community edition of Didact can ignore this field.
:::