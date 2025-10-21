# Environment Init

Initializes a new environment in the Didact database.

```bash-vue
didact environment init --name "<ENVIRONMENT_NAME>" [--description "<ENVIRONMENT_DESCRIPTION>"]
```

## Options
- `--name` (string): The name of the new environment.
- `--description` (string): The description of the new environment.

## Examples

Creates a new environment called "Staging".

```bash
didact environment init --name "Staging"
```

Creates a new environment called "Development" with an associated description.

```bash
didact environment init --name "Development" --description "A wip environment for the dev team."
```