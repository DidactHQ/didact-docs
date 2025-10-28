# Engine Config Set

Sets a configuration key and value for Didact Engine.

```bash-vue
didact engine config set --key "<KEY_NAME>" --value <KEY_VALUE>
```

## Options
- `--key` (string): The name of the configuration key.
- `--value` (string or number or boolean or null): The value of the configuration key.

For a full list of the config keys that you can set, see the [config key matrix](/core-concepts/didact-engine/engine-config#engineconfig-json-key-matrix).

## Examples

Set the database provider and database connection string in back-to-back commands.

```bash
didact engine config set --key "Database.Provider" --value "SQLServer"
```

```bash
didact engine config set --key "Database.ConnectionString" --value "localhost"
```

Set the license key.

```bash
didact engine config set --key "LicenseKey" --value "someAPIKeyabd123..."
```