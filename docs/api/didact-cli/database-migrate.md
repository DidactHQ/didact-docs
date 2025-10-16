# Database Migrate

```bash-vue
didact database migrate [--provider "<DB_PROVDER_KEY>" --connection-string "<DB_CONNECTION_STRING>"]
```

If a database provider and connection string are not defined in `didact config`, then specify the `--provider` and `--connection-string` here. Otherwise, they are not necessary.

You can find the supported database providers and their keys in [database providers](/core-concepts/architecture/metadata-database#database-providers).