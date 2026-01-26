# Deployment Version

Update the version for the specified deployment.

```bash
didact deployment version <VERSION> --name <DEPLOYMENT_QUALIFIED_NAME>
```

## Options
- `--name` <Badge type="danger" text="required" /> (string) : The deployment's qualified name `<environment>/<deployment>`.

## Examples

Update the deployment version to `v1.1.0` for the deployment named `default/flow-library`.

```bash
didact deployment version v1.1.0 --name default/flow-library
```