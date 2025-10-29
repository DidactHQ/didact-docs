# UI Config

Since Didact UI is a build once, deploy anywhere application, its behaviors are modified through a simple configuration file. This configuration file can be thought of as a set of runtime environment variables for Didact UI.

## uiconfig.json

To provide important environment variables and app settings for Didact Engine, you need a `uiconfig.json` file.

This is similar to a `.env` file that you would find in a standard single page app project. Here, the single page app is wrapped and exposed through a minimal dotnet web api that is able to read a config file.

::: info
This subarchitecture for Didact UI was chosen because normal single page apps can only read environment variables **at build time**. However, this is intended to be a build once, deploy anywhere application, so I chose to wrap it in a standard server-side app like a dotnet web api so that appsettings and environment variables can be defined **post build time** through a config file.
:::

## uiconfig.json template

A `uiconfig.json` JSON template file is shown below:

```json
{
    "EngineBaseUrl": "<BASE_URL>"
}
```

## uiconfig.json key matrix

The config keys are shown below in a matrix.

::: info
For simplicity, when referencing these keys through Didact CLI commands, use the exact JSON key reference here such as `EngineBaseUrl`. It makes the CLI commands slightly ugly, but it avoids unproductive aliasing work on my part for the moment.
:::

| JSON and CLI key name | Key value type | Key value description |
| --- | :---: | --- |
| `EngineBaseUrl` | string | The base URL for Didact Engine. |

### EngineBaseUrl

::: warning
Do not include the trailing slash nor any additional paths.
:::