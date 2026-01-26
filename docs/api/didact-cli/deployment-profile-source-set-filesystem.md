# Deployment-Profile-Source Set Filesystem

Sets the deployment profile source of the specified [deployment profile](/core-concepts/deployments/deployments-file#deployment-profiles) to the filesystem.

```bash-vue
didact deployment-profile-source set filesystem --path ./path-to-deployment-folder --profile <PROFILE_NAME>
```

- `--path` (string) : The path to the deployment's containing folder.
- `--profile` (string) : The name of the target deployment profile.

## Examples

Set a filesystem source pointing to the hard-coded deployment path `C:\deployments\some-deployment` for the deployment profile named `default`.

```bash
didact deployment-profile-source set filesystem --path "C:\deployments\some-deployment" --profile default
```

Set a filesystem source pointing to the target deployments folder using [deployment contexts](/core-concepts/deployments/deployments-file#deployment-contexts) for the deployment profile named `default`.

```bash
didact deployment-profile-source set filesystem --path "C:\deployments\${name}-${artifact.version}" --profile default
```