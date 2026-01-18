# Deployment Push

Pushes a deployment's metadata to the Didact database from `didact.deployments.json`.

```bash
didact deployment push <DEPLOYMENT_QUALIFIED_NAME>
```

where `<DEPLOYMENT_QUALIFIED_NAME>` is the deployment's qualified name `environment/deployment`.

## Examples

Push the deployment named `some-deployment` belonging to the `production` environment.

```bash
didact deployment push production/some-deployment
```