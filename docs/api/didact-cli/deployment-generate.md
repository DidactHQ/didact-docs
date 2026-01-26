# Deployment Generate

Generates a new deployment from the specified [deployment profile](/core-concepts/deployments/deployments-file#deployment-profiles).

```bash
didact deployment generate --profile <PROFILE_NAME>
```

- `--profile` (string): The name of the target deployment profile to generate the new deployment from.

## Examples

Generate a new deployment from a deployment profile named `default`.

```bash
didact deployment generate --profile default
```