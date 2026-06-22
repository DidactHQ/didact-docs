# Deploy Filesystem

Deploys the flow library to the specified filesystem path.

```bash
didact deploy filesystem --project <.CSPROJ> --path <FOLDER_PATH> --env <ENVIRONMENT>
```

- `<.CSPROJ>` (string): The path to the flow library's `.csproj` file.
- `<FOLDER_PATH>` (string): The path to store the flow library.

::: info
If `--path` is not specified, then Didact's default filesystem deployment folder path is used.
:::

- `<ENVIRONMENT>` (string): The name of the Didact environment.

::: info
If `--env` is not specified, then the default Didact environment is used.
:::