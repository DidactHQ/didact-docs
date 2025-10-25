# Engine Config Set

Sets a configuration key and value for Didact Engine.

```bash-vue
didact engine config set --key "<KEY_NAME>" --value <KEY_VALUE>
```

## Options
- `--key` (string): The name of the configuration key.
- `--value` (string or number or boolean or null): The value of the configuration key.

## Key names and values

| Key name | Key value type | Key value description |
| --- | :---: | --- |
| `Database.Provider` | string | The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice.
| `Database.ConnectionString` | string | The connection string for the database. |
| `Environment` | string | The name of the default environment that you want to use. |
| `LicenseKey` | string | An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features. |

## Examples

Set the database provider and database connection string in back-to-back commands.

```bash
didact config set --key "Database.Provider" --value "SQLServer"
```

```bash
didact config set --key "Database.ConnectionString" --value "localhost"
```

Set the default environment.

```bash
didact config set --key "Environment" --value "Production"
```

Set the license key.

```bash
didact config set --key "LicenseKey" --value "someAPIKeyabd123..."
```