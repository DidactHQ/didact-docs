# Deployments File

## Deployment Profiles

## Deployment Contexts

::: v-pre

- `${environment}`
The deployment's environment name.

```bash
${environment}
```

- `${deployment}`
The deployment's name.

```bash
${deployment}
```

- `${version}`
The deployment's version.

```bash
${version}
```

:::

## Deployments template

A `didact.deployments.json` JSON template file is shown below with the `default` config profile:

```json
{
  "$schema": "https://schema.didact.dev/v1/didact.deployments.config.json",
  "name": "FlowLibrary",
  "artifact": {
    "type": "dotnet-class-library",
    "entrypoint": "FlowLibrary.dll",
    "version": "v1.0.0"
  },
  "profiles": {
    "default": {
      "deploymentNameFormat": "${name}-${artifact.version}",
      "environment": "default",
      "source": {
        "type": "filesystem",
        "filesystem": {
          "path": "./deployments/${name}-${artifact.version}.zip"
        }
      }
    }
  }
}
```