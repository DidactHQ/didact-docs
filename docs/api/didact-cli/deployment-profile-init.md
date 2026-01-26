# Deployment-Profile Init

Initializes a new [deployment profile](/core-concepts/deployments/deployments-file#deployment-profiles) in the [deployments file](/core-concepts/deployments/deployments-file).

```bash
didact deployment-profile init --name <PROFILE_NAME> --environment <ENVIRONMENT> --deployment-name-format "<DEPLOYMENT_NAME_FORMAT>" 
```

- `--name` (string): The name of the deployment profile.
- `--environment` (string): The name of the deployment profile's target environment.
- `--deployment-name-format` (string): The naming formatter for generating unique deployment names when a new deployment is generated from the deployment profile.

## Examples

Create a new deployment profile named `default` that targets the `default` environment and generates a unique deployment name from the deployment base name and the artifact version [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts).

```bash
didact deployment-profile init --name default --environment default --deployment-name-format "${name}-${artifact.version}"
```