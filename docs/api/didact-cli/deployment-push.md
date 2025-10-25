# Deployment Push

Pushes a deployment update to the Didact database.

```bash-vue
didact deployment push --path "<PATH_TO_DEPLOYMENT_FILE>"
```

## Options
- `--path` (string): The path to the flow library's deployment file.

## Examples

Push the deployment, assuming the terminal was opened from the same directory where the deployment file is located.

```bash
didact deployment push
```

Push the deployment, specifying a path to the flow library's deployment file.

```bash
didact deployment push --path "C:\Users\MyUser\FlowLibraries\FlowLibrary\deployment.json"