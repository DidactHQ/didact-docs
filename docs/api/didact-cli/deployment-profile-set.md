# Deployment-Profile Set

Sets the value of a given setting for a [deployment profile](/core-concepts/deployments/deployments-file#deployment-profiles).

```bash
didact deployment-profile set <SETTING_NAME> <SETTING_VALUE> --profile <PROFILE_NAME>
```

- `<SETTING_NAME>` (string): The deployment profile setting.
- `<SETTING_VALUE>` (any): The deployment profile setting's value.
- `--profile` (string): The name of the target deployment profile.

## Examples

Update the target environment to `production` for the deployment profile named `default`.

```bash
didact deployment-profile set environment production --profile default
```

Update the deployment name format to use [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts) for the deployment profile named `production`.

```bash
didact deployment-profile set deploymentNameFormat "${name}-${artifact.version}" --profile default
```