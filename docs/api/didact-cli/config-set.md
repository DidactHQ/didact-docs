# Config Set

Sets a configuration key and value for Didact CLI.

```bash-vue
didact config set <KEY_NAME> <KEY_VALUE>
```

- `<KEY_NAME>` (string): The config setting name.
- `<KEY_VALUE>` (any): The config setting value.

::: info
For a list of all config settings, see the [config page](/core-concepts/setup/config#config-settings). The settings must be referenced by their exact JSON dot notation.
:::

## Examples

Set the database provider and database connection string in back-to-back commands.

```bash
didact config set engine.database.provider SQLServer
```

```bash
didact config set engine.database.connectionString "localhost"
```

Set the license key.

```bash
didact config set engine.licenseKey someAPIKeyabd123...
```