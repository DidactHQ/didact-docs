---
title: License Keys
description:
---

<script setup>
const exampleDidactLicenseKey = import.meta.env.VITE_EXAMPLE_DIDACT_LICENSE_KEY;
const consoleBaseUrl = import.meta.env.VITE_DIDACT_CONSOLE_BASE_URL;
</script>

# License Keys

## How to obtain a license key

To unlock the enhanced features of the Didact platform, you need to purchase a paid plan in the customer portal, called [Didact Console](https://console.didact.dev).

Inside of Didact Console, you will find a licensing page where your license key is generated upon purchasing your paid plan.

Your license key should look something like the example one below:

```bash-vue
{{ exampleDidactLicenseKey }}
```

## Save your license key

As mentioned in [Terminology](/core-concepts/licensing-system/terminology#license-key), your license key is a sensitive, secret value that is scoped only to your organization per the terms of the commercial license for Didact and is **not** meant to be shared anywhere else. Handle this license key with care.

You will need to use it in order to authenticate Didact with the license server, so you may need to copy and paste it from Didact Console. That's fine, just make sure to delete or securely store your local copy so that the key is not accidentally leaked anywhere.

## How to use the license key

The license key can be used in both Didact CLI and Didact Engine. Each application has its own guide, though they are nearly the same steps in either case: you save the license key as a config value to the app's respective config file. Make sure to check out the [CLI config](/core-concepts/didact-cli/cli-config) and [engine config](/core-concepts/didact-engine/engine-config) docs for details.