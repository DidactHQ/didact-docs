<script setup>
const exampleDidactLicenseKey = import.meta.env.VITE_EXAMPLE_DIDACT_LICENSE_KEY;
</script>

# Authentication

## How to obtain a license key

To unlock the enhanced features of the Didact platform, you need to purchase a paid plan in the customer portal, called Didact Hub. You can [login here](https://hub.didact.dev).

Inside of Didact Hub, you will find a licensing page where your license key is generated upon purchasing your paid plan.

Your license key should look something like the example one below:

```bash-vue
{{ exampleDidactLicenseKey }}
```

## Save your license key

As mentioned in [Terminology](/core-concepts/licensing-system/terminology#license-key), your license key is a sensitive, secret value that is scoped only to your organization per the terms of the commercial license for Didact and is **not** meant to be shared anywhere else. Handle this license key with care.

You will need to use it in order to authenticate Didact with the license server, so you may need to copy and paste it from Didact Hub. That's fine, just make sure to delete or securely store your local copy so that the key is not accidentally leaked anywhere.

## How to use the license key

In Didact Engine, you will need to use the license key in order to authenticate with the license server and unlock Didact's enhanced features.

Since Didact is a build once, deploy anywhere application, you need only follow the [environment variables guide](/core-concepts/didact-engine/environment-variables) for Didact Engine to properly use your license key. Namely, in your `enginesettings.json` file, add the following (using your own license key):

```json
{
    // Other settings
    "LicenseKey": "<YOUR_LICENSE_KEY_HERE>"
}
```

## License key lifecycle