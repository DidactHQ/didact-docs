# Config

Sets configurations required for Didact CLI to interact with the platform.

```bash-vue
didact config [--provider "<DB_PROVDER_KEY>" --connection-string "<DB_CONNECTION_STRING>" --environment "<ENVIRONMENT_NAME>" --license-key "<LICENSE_KEY>"]
```

## Options
- `--provider` (string): The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice.
- `--connection-string` (string): The connection string for the database.
- `--environment` (string): The name of the default environment that you want to use.

::: warning
All other CLI commands will use this default environment unless other specified.
:::

- `--license-key` (string): An API key from [Didact Console](https://console.didact.dev) that unlocks enhanced features.

## Examples

Set the database provider and database connection string.

```bash
didact config --provider "SQLServer" --connection-string "localhost"
```

Set the default environment.

```bash
didact config --environment "Production"
```

Set the license key.

```bash
didact config --license-key "someAPIKeyabd123..."
```