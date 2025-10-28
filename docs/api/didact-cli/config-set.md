# Config Set

Sets a configuration key and value for Didact CLI.

```bash-vue
didact config set --key "<KEY_NAME>" --value <KEY_VALUE>
```

## Options
- `--key` (string): The name of the configuration key.
- `--value` (string or number or boolean or null): The value of the configuration key.

For a full list of the config keys that you can set, see the [config key matrix](/core-concepts/didact-cli/cli-config#cliconfig-json-key-matrix).

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