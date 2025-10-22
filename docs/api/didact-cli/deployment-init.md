# Deployment Init

Initializes a new deployment for a flow library.

```bash-vue
didact deployment init --name "<DEPLOYMENT_NAME>" --library-name "<FLOW_LIBRARY_NAME>" [--path "<FLOW_LIBRARY_PUBLISH_PATH>"]
```

## Options
- `--name` (string): The name of the new deployment.
- `--library-name` (string): The name of the flow library's main .dll file.
- `--path` (string): The flow library's publish directory.

::: warning
`--path` must be specified unless the terminal is launched from the flow library's publish directory. If specifying the path, do not specify a path to a file such as `./publish/Flow Library.dll`; rather, specify only to the folder level such as `./publish`.
:::

## Examples

Create a new deployment for a flow library called "Flow Library". Assume the terminal was launched from the publish artifact directory of "Flow Library".

```bash
didact deployment init --name "My deployment" --library-name "Flow Library"
```

Create a new deployment for a flow library called "Flow Library" and specify the path.

```bash
didact deployment init --name "My deployment" --library-name "Flow Library" --path "./Flow Library/publish"
```