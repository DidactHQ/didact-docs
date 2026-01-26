# Deployment Set

Set's the value of a given setting for a deployment in `didact.deployments.json`.

```bash-vue
didact deployment set <SETTING_NAME> <SETTING_VALUE> --name <DEPLOYMENT_QUALIFIED_NAME>
```

where `<SETTING_NAME>` is the setting's JSON key and `<SETTING_VALUE>` is the setting's value.

## Options
- `--name` <Badge type="danger" text="required" /> (string) : The deployment's qualified name `<environment>/<deployment>`.

## Examples

Update the version of a deployment named `production/some-deployment`.

```bash
didact deployment set version v1.1.0 --name production/some-deployment
```

Update the description of a deployment named `production/some-deployment`.

```bash
didact deployment set description "This is a description." --name production/some-deployment
```