# Migrate

Runs migrations against Didact's metadata database.

```bash-vue
didact migrate [--provider "<DB_PROVDER_KEY>" --connection-string "<DB_CONNECTION_STRING>"]
```

## Options
- `--provider` (string): The [database provider key](/core-concepts/architecture/metadata-database#database-providers) for your database provider of choice.
- `--connection-string` (string): The connection string for the database.

::: warning
If `--provider` and `--connection-string` are specified in [didact config](/api/didact-cli/config), then they are not necessary here.
:::

## Examples

Run migrations against a SQL Server database.

```bash
didact migrate --provider "SQLServer" --connection-string "localhost"
```