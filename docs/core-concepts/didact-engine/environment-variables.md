# Environment Variables

Since Didact Engine is a build once, deploy anywhere application, you are intended to take the prebuilt binaries, use them as is, and modify their behavior only through the use of **runtime environment variables**.

## Enginesettings.json

Namely, whatever root directory you run Didact Engine's executable file inside of, you need to add a special environment variable file called `enginesettings.json`. This file is quite similar to `appsettings.json` but is intended for you to set runtime environment variables as needed.

::: tip Separation of concerns
These runtime environment variables are for Didact Engine *only*. Didact UI has its own runtime environment variables.
::: 

The full template for `enginesettings.json` is shown below:

```json
{
    "Database": {
        "Provider": "SQLServer",
        "ConnectionString": "<YOUR_CONNECTION_STRING_HERE>"
    },
    "LicenseKey": "<YOUR_LICENSE_KEY_HERE>",
    "Directive": "Leader",
    "EngineTuningName": "Default"
}
```

However, feel free to read each field's corresponding doc section for more details.

### Database.Provider

The key of the database provider that you want to use for Didact's database.

The database provider names are shown below:

| Provider Name | Provider Key | Status |
| --- | --- | --- |
| SQL Server | "SQLServer" | Supported |
| Azure SQL Database | "SQLServer" | Supported |
| PostgreSQL | "PostgreSQL" | Planned |

### Database.ConnectionString

The connection string for Didact's database. Ensure that it matches the appropriate provider.

### LicenseKey

Your Didact paid plan's license key.

::: warning For customers only
If you are not a Didact customer / only use the Community Edition, you can omit this field.

If you *are* a Didact customer, make sure to include this license key or else your enhanced features may not be unlocked.
:::

### Directive

The name of the Directive that you want Didact Engine to use.

If omitted, the `Leader` directive will be used by default.

The Directives are shown below:

| Name |
| --- |
| Leader |
| Worker |

### EngineTuningName

The name of the Engine Tuning that you want Didact Engine to use.

If omitted, the "Default" Engine Tuning will be used.