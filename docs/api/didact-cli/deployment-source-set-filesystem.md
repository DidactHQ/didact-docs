# Deployment-Source Set Filesystem

Set's a filesystem deployment source for a deployment in `didact.deployments.json`.

```bash-vue
didact deployment-source set filesystem --path ./path-to-deployment-folder --name <DEPLOYMENT_QUALIFIED_NAME>
```

## Options
- `--path` <Badge type="danger" text="required" /> (string) : The path to the deployment's containing folder.
- `--name` <Badge type="danger" text="required" /> (string) : The deployment's qualified name `<environment>/<deployment>`.

## Examples

Set a filesystem source pointing to the target deployments folder `./deployments/some-deployment` for a deployment named `production/some-deployment`.

```bash
didact deployment-source set filesystem --path "C:\deployments\some-deployment" --name production/some-deployment
```

Set a filesystem source pointing to the target deployment folder that is auto-generated from the deployment name, environment name, and deployment version using [deployment contexts](/core-concepts/deployments/deployment-contexts).

```bash
didact deployment-source set filesystem --path "C:\deployments\${environment}\${deployment}\${version}" --name production/some-deployment
```

::: tip
The usage of [deployment contexts](/core-concepts/deployments/deployment-contexts) are strongly encouraged to assist in making each deployment version and deployment push unique and immutable. New deployment versions should not overwrite previous deployment versions.
:::