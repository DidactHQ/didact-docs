# UI Install

Installs Didact UI to your machine.

```bash-vue
didact ui install [--path "<INSTALL_PATH>"]
```

## Options
- `--path` (string): The install path for Didact UI.

::: info
If `--path` is not specified, then a default installation path is used.
:::

## Examples

Install Didact UI at the default location.

```bash
didact ui install
```

Install Didact UI at a specified location.

```bash
didact ui install --path "C:\Program Files\Didact\Didact UI"
```