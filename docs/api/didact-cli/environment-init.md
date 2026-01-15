# Environment Init

Initializes a new environment in the Didact database.

```bash-vue
didact environment init <ENVIRONMENT_NAME> [--description "<ENVIRONMENT_DESCRIPTION>"]
```

## Options
- `--description` (string): The description of the new environment.

## Examples

Creates a new environment called `staging`.

```bash
didact environment init staging
```

Creates a new environment called `development` with an associated description.

```bash
didact environment init development --description "A wip environment for the dev team."
```