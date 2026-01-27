# Deployment Set

Sets the value of a given setting for in the [deployments file](/core-concepts/deployments/deployments-file).

```bash
didact deployment set <SETTING_NAME> <SETTING_VALUE>
```

- `<SETTING_NAME>` (string): The deployment setting.
- `<SETTING_VALUE>` (any): The deployment setting's value.

## Examples

Update the deployment base name to `FlowLibrary`.

```bash
didact deployment set name FlowLibrary
```

Update the deployment artifact entrypoint file to `FlowLibrary.dll`.

```bash
didact deployment set artifact.entrypoint FlowLibrary.dll
```

Update the deployment artifact version to `v1.1.0`.

```bash
didact deployment set artifact.version v1.1.0
```