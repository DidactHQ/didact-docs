---
title: License Refresh
description:
---

<script setup>
const exampleDidactLicenseKey = import.meta.env.VITE_EXAMPLE_DIDACT_LICENSE_KEY;
</script>

# License Refresh

Authenticate the license key to Didact's licensing server and, if successful, store the subsequent smart key in the Didact database.

```bash-vue
didact license refresh [--license-key <LICENSE_KEY>]
```

## Examples

Authenticate the license key that is already set in Didact CLI's config.

```bash
didact license refresh
```

Authenticate a specified license key.

```bash-vue
didact license refresh --license-key {{ exampleDidactLicenseKey }}
```