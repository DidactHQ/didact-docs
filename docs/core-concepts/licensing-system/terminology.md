<script setup>
const exampleDidactLicenseKey = import.meta.env.VITE_EXAMPLE_DIDACT_LICENSE_KEY;
</script>

# Terminology

If you are a Didact customer who purchased a paid plan of the platform, there is some imporant terminology to learn so that you understand the various components of the licensing system. 

## License server

I host a special license server up in the cloud for Didact customers / paid users. This license server is essentially a private REST API which is used for dispensing, authenticating, and validating API keys that your self-hosted instances of Didact use to unlock enhanced features of the platform.

The license server endpoints are used internally by Didact Engine, but they are documented for transparency in the API section.

The license server is built with resilience and reliability in mind. If you would like to see its current uptime status, feel free to check out the [Didact status page](https://status.didact.dev) and read [Uptime and Alerting](/core-concepts/licensing-system/uptime-and-alerting).

## License key

The license key is the unencrypted, simple API key that you get from Didact Hub once you purchase a paid plan for Didact.

This key is tied to your organization account in Didact Hub and is necessary for you to unlock the paid features of Didact.

An example license key is shown below:

```bash-vue
{{ exampleDidactLicenseKey }}
```

::: danger Keep it secret, keep it safe
Your license key is a secret key that you should **not** share with anyone outside of your organization. It is a secret key used *only* in Didact Engine and/or Didact CLI, so don't expose it on the frontend, don't accidentally commit it to version control, and only use it in CI/CD systems when proper secret storage mechanisms are used.
:::

## Smart key

When license keys are successfully authenticated with Didact's license server, the license server returns smart keys.

Smart keys are asymmetrically-signed JSON payloads with important customer metadata, key metadata, and paid plan metadata about using the enhanced modes of Didact.

Didact Engine contains a hard-coded public key that is used to verify the cryptographic signature of your smart keys to ensure that they are legitimate and sourced from Didact's own license server.

## Asymmetric encryption

Asymmetric encryption is a special form of encryption used to encrypt and validate data.

In asymmetric encryption, a cryptographic system generates a key pair, namely, a private key and a public key.

The private key is the special, secret key that is securely stored, **never shared**, and used to encrypt data.

The public key is a shareable key used for signature validation by users of the cryptographic system. Essentially, a public key looks at a piece of asymmetrically-encrypted data and verifies that the data was encrypted by its private key brother.

Asymmetric encryption is used extensively all throughout the computing world and is a popular flavor of encryption for the vastly successful Json Web Token (JWT) authentication system used in modern web apps.