# UI Config

Since Didact UI is a build once, deploy anywhere application, its behaviors are modified through a simple configuration file. This configuration file can be thought of as a set of runtime environment variables for Didact UI.

## uiconfig.json

To provide important environment variables and app settings for Didact Engine, you need a `uiconfig.json` file.

This is similar to a `.env` file that you would find in a standard single page app project. Here, the single page app is wrapped and exposed through a minimal dotnet web api that is able to read a config file.

::: info
This subarchitecture for Didact UI was chosen because normal single page apps can only read environment variables **at build time**. However, this is intended to be a build once, deploy anywhere application, so I chose to wrap it in a standard server-side app like a dotnet web api so that appsettings and environment variables can be defined **post build time** through a config file.
:::

## uiconfig.json path

The `uiconfig.json` file must exist in the same root directory as the Didact UI binary/executable. By default, the [ui install command](/api/didact-cli/ui-install) and [ui config init command](/api/didact-cli/ui-config-init) from the Didact CLI will autoinstall and autocreate the Didact UI binary/executable and the `uiconfig.json` file in the same default directory to ensure that the two are next to each other.

::: danger
If you install Didact UI somewhere other than its default install location, then you must ensure that a `uiconfig.json` file is created in the same directory for Didact UI to read.
:::

## uiconfig.json CLI commands

To create the `uiconfig.json` file, use the [ui config init](/api/didact-cli/ui-config-init) command.

To populate or edit the `uiconfig.json` file, use the [ui config set](/api/didact-cli/ui-config-set) command.

To see the current values inside the `uiconfig.json` file, using the [ui config inspect](/api/didact-cli/ui-config-inspect) command.

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