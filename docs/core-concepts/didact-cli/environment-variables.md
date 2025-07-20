# Environment Variables

Since Didact CLI is a build once, deploy anywhere application, you are intended to take the prebuilt binaries, use them as is, and modify their behavior only through the use of **runtime environment variables**.

## Enginesettings.json

Namely, whatever root directory you run Didact CLI's executable file inside of, you need to add a special environment variable file called `clisettings.json`. This file is quite similar to `appsettings.json` but is intended for you to set runtime environment variables as needed.

::: tip Separation of concerns
These runtime environment variables are for Didact CLI *only*. Didact Engine and Didact UI have their own runtime environment variables.
::: 

The full template for `clisettings.json` is shown below:

```json
{
    "Database": {
        "Provider": "SQLServer",
        "ConnectionString": "<YOUR_CONNECTION_STRING_HERE>"
    },
    "LicenseKey": "<YOUR_LICENSE_KEY_HERE>"
}
```

However, feel free to read each field's corresponding doc section for more details.

### Database.Provider

| Descriptor | Value |
| --- | --- |
| Key         | Database.Provider |
| Type        | `string` |
| Description | Didact's database provider key. |
| Required    | `true` |
| Default     | `SQLServer` |

The database provider names are shown below:

| Provider Name | Provider Key | Status |
| --- | --- | --- |
| SQL Server | `SQLServer` | Supported |
| Azure SQL Database | `SQLServer` | Supported |
| PostgreSQL | `PostgreSQL` | Planned |

### Database.ConnectionString

| Descriptor | Value |
| --- | --- |
| Key         | Database.ConnectionString |
| Type        | `string` |
| Description | Didact's database connection string. |
| Required    | `true` |
| Default     | N/A |

### LicenseKey

| Descriptor | Value |
| --- | --- |
| Key         | LicenseKey |
| Type        | `string` |
| Description | The license key for your Didact paid plan. |
| Required    | `true` for customers only |
| Default     | N/A |

::: warning For customers only
If you are not a Didact customer / only use the Community Edition, you can omit this field. If you *are* a Didact customer, make sure to include this license key or else your enhanced features may not be unlocked.
:::