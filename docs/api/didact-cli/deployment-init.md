# Deployment Init

Initializes a new [deployments file](/core-concepts/deployments/deployments-file).

```bash
didact deployment init --name <DEPLOYMENT_NAME> --artifact-entrypoint <ENTRYPOINT_FILE> --artifact-version <VERSION>
```

::: tip
If `didact.deployments.json` does not exist when invoking this command, then the file will be auto-created.
:::

## Options
- `--name` (string): The name of the new deployment.
- `--artifact-entrypoint` (string): The name of the entrypoint file.

::: danger
`--artifact-entrypoint` is required if a new `didact.deployments.json` file needs to be created. If you are simply adding a new deployment to a pre-existing `didact.deployments.json` file, then `--artifact-entrypoint` is not necessary.
:::

- `--artifact-version` (string): The version of the artifact.

## Examples

Create a new deployment named `flow-library` for the class library named `FlowLibrary` and specify the version.

```bash
didact deployment init --name some-deployment --artifact-entrypoint FlowLibrary.dll --artifact-version v1.0.0
```