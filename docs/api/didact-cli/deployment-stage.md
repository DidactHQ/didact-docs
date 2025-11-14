# Deployment Stage

Flags a deployment as unavailable in the Didact database in prepation for a deployment push.

```bash-vue
didact deployment stage --id <DEPLOYMENT_ID>
```

## Options
- `--id` (number): The target DeploymentId.

## Examples

Stage the deployment.

```bash
didact deployment stage --id 2
```