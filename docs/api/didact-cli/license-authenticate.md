# License Authenticate

Authenticates the license key with the Didact Console API.

```bash-vue
didact license authenticate [--value "<LICENSE_KEY>"]
```

## Examples

Authenticate the license key, assuming the license key is already specified in the CLI config.

```bash-vue
didact license authenticate
```

Authenticate the license key and specify it in the command.

```bash-vue
didact license authenticate --value "someKey"
```