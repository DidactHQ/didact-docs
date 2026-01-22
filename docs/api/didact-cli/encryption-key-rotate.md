# Encryption-Key Rotate

Rotates symmetric encryption keys used for [Didact secrets](/core-concepts/secrets) by decrypting the secrets with the current encryption key and then encrypting the secrets with the new encryption key.

```bash
didact encryption-key rotate --current-key "currentkey123..." --new-key "newkey123..."
```

## Examples

Rotate encryption keys.

```bash
didact encryption-key rotate --current-key "currentkey123..." --new-key "newkey123..."
```