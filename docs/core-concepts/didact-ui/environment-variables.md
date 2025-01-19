# Environment Variables

Since Didact UI is a build once, deploy anywhere application, you are intended to take the prebuilt binaries, use them as is, and modify their behavior only through the use of **runtime environment variables**.

## Uisettings.json

Namely, whatever root directory you run Didact UI's executable file inside of, you need to add a special environment variable file called `uisettings.json`. This file is quite similar to `appsettings.json` or `.env` files used in typical single page apps but is intended for you to set runtime environment variables as needed.

::: tip Separation of concerns
These runtime environment variables are for Didact UI *only*. Didact Engine has its own runtime environment variables.
::: 

The full template for `uisettings.json` is shown below:

```json
{
    "EngineBaseUrl": "..."
}
```

### EngineBaseUrl

| Descriptor | Value |
| --- | --- |
| Key         | EngineBaseUrl |
| Type        | `string` |
| Description | The base URL for Didact Engine. |
| Required    | `true` |
| Default     | N/A |

::: danger Keep it simple
Do **not** include the trailing slash nor any additional paths.
:::

For local development, this would be `http://localhost:<PORT_NUMBER>`.

For deployments, this would be either:

1. The URL of the `Leader` engine, or
2. The URL of a reverse proxy / load balancer sitting in front of an engine cluster.