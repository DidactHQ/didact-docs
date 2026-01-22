# Encryption-Key Generate

Generates a new randomized, 32-byte, base64-encoded symmetric encryption key to use in Didact's [config](/core-concepts/setup/config).

```bash
didact encryption-key generate
```

::: danger
This command does NOT persist the encryption key to the Didact config; you must do that yourself. To properly set/persist a new encryption key for Didact, I highly recommend you read through the [setup encryption key](/guides/setup-encryption-key) guide.
:::

## Examples

Generate a new encryption key.

```bash
didact encryption-key generate
```