# Engine Config

Since Didact Engine is a build once, deploy anywhere application, its behaviors are modified through a simple configuration file. This configuration file can be thought of as a set of runtime environment variables for Didact Engine.

## engineconfig.json

To provide important environment variables and app settings for Didact Engine, you need an `engineconfig.json` file. This is similar to an `appsettings.json` file that you would find in a standard dotnet project.

## engineconfig.json template

A `engineconfig.json` JSON template file is shown below:

```json
{
    "Database": {
        "Provider": "<DB_PROVIDER_KEY>",
        "ConnectionString": "<DB_CONNECTION_STRING>"
    },
    "LicenseKey": "<LICENSE_KEY>"
}
```

## engineconfig.json key matrix

The config keys are shown below in a matrix.

::: info
For simplicity, when referencing these keys through Didact CLI commands, use the exact JSON key reference here such as `Database.Provider`. It makes the CLI commands slightly ugly, but it avoids unproductive aliasing work on my part for the moment.
:::

| JSON and CLI key name | Key value type | Key value description |
| --- | :---: | --- |
| `Database.Provider` | string | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice. |
| `Database.ConnectionString` | string | The connection string for the database. |
| `LicenseKey` | string | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |