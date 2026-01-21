# Encryption-Key Rotate

Pushes a deployment's metadata to the Didact database from `didact.deployments.json`.

```bash
didact deployment push <DEPLOYMENT_QUALIFIED_NAME>
```

where `<DEPLOYMENT_QUALIFIED_NAME>` is the deployment's qualified name `environment/deployment`.

::: warning
To properly rotate encryption keys for Didact, I highly recommend you read through the [rotate encryption keys](/guides/rotate-encryption-keys) guide.
:::

## Examples

Push the deployment named `some-deployment` belonging to the `production` environment.

```bash
didact deployment push production/some-deployment
```