# Deployment Init

Initializes a new deployment in the local `didact.deployments.json` file.

```bash-vue
didact deployment init --name <DEPLOYMENT_NAME> --environment <ENVIRONMENT> --entrypoint <ENTRYPOINT_FILE> [--description "<DESCRIPTION>"]
```

::: tip
If `didact.deployments.json` does not exist when invoking this command, then the file will be auto-created.
:::

## Options
- `--name` (string): The name of the new deployment.
- `--environment` (string): The name of the target environment.
- `--entrypoint` (string): The name of the entrypoint file.

::: tip
For class libraries, the entrypoint file will be the main assembly `.dll`. For example, for a class library named `FlowLibrary`, the entrypoint file would be `FlowLibrary.dll`.
:::

- `--description` (string): The description of the new deployment.

## Examples

Create a new deployment named `some-deployment` for the `production` environment whose class library is named `FlowLibrary`.

```bash
didact deployment init --name some-deployment --environment production --entrypoint FlowLibrary.dll
```