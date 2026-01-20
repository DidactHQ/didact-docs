# Deployment Init

Initializes a new deployment in the local `didact.deployments.json` file.

```bash-vue
didact deployment init --name <DEPLOYMENT_NAME> --environment <ENVIRONMENT> [--entrypoint <ENTRYPOINT_FILE> --description "<DESCRIPTION>"]
```

::: tip
If `didact.deployments.json` does not exist when invoking this command, then the file will be auto-created.
:::

## Options
- `--name` (string): The name of the new deployment.
- `--environment` (string): The name of the target environment.
- `--entrypoint` (string): The name of the entrypoint file.

::: danger
`--entrypoint` is required if a new `didact.deployments.json` file needs to be created. If you are simply adding a new deployment to a pre-existing `didact.deployments.json` file, then `--entrypoint` is not necessary.
:::

- `--description` (string): The description of the new deployment.

## Examples

Create a new deployment named `some-deployment` for the `production` environment whose class library is named `FlowLibrary`. Assume we do NOT have a pre-existing `didact.deployments.json` file, so we need to specify `--entrypoint`.

```bash
didact deployment init --name some-deployment --environment production --entrypoint FlowLibrary.dll
```

Create a new deployment named `some-deployment` for the `production` environment whose class library is named `FlowLibrary`. Assume we already have a pre-existing `didact.deployments.json` file where `--entrypoint` was previously specified.