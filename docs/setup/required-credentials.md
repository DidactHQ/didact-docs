# Required Credentials

In order for Displagent to access and embed your Power BI content, it requires five credentials from you:

* Azure App Registration
    * Azure Tenant ID
    * Azure App ID
    * Azure App Secret
* Power BI Service account
    * Username
    * Password


These are discussed in more details below and in the following pages.

## Encryption

Let's get the most important question out of the way first: if you give Displagent the five credentials above, where are they stored?

The answer is: they are stored on your own machines - you can't get much safer than that!

This is actually the primary motivation behind why I changed Displagent from a web application to a cross-platform desktop application: as a desktop application, Displagent can take these credentials and store them locally on your machine as a credentials file.

Even better, Displagent also **encrypts** the credentials file once they are stored - just in case anyone on your machine goes snooping around for them!

::: tip TL;DR;
In summary, these credentials are NOT stored in Displagent's database or backend - anywhere. They are yours, they stay with you, and they are encrypted on your own machines.
:::

## Azure App Registration

[As per Microsoft's own recommendation](https://learn.microsoft.com/en-us/power-bi/developer/embedded/register-app?tabs=customers), the easiest, least-painful, and most reliable way to authenticate a third-party application to your Power BI tenant is by creating an Azure App Registration in your company's Azure tenant.

Think of an Azure App Registration like a virtual gateway; using its associated credentials, you can allow a custom application to access your Power BI content.

This is exactly how Displagent accesses your Power BI content. See the dedicated docpage for how to set this up.

## Power BI Service Account

Additionally, it is **highly recommended** - though not _technically required_ - to provision a dedicated service account in your company's Azure Active Directory.

This service account will be used alongside your Azure App Registration to access your Power BI content. All you need is a username, a password, and a Power BI license.

::: warning
If you cannot currently provision a service account, don't worry: you can use your own Power BI account if you wish. However, to avoid dependencies on any one employee's active directory account, I highly stress provisioning a service account for uninterrupted usage.
:::

### Service Account Licensing

Like all Power BI users, your service account will require a Power BI license to be assigned to it from your Microsoft 365 admin. The type of Power BI license your service account requires is dependent on what Power BI content you want to access through it - in particular, what types of workspaces your Power BI content resides in.

For standard, shared-capacity workspaces, a Power BI Pro license is sufficient here. And if you have Power BI Premium, you don't have to worry about this at all because your entire tenant runs off of dedicated capacities.

However, if your company utilizes Power BI Premium Per User to access some of this content, then your service account will likely also need a Power BI Premium Per User license.

::: tip TL;DR;
In general, an easy rule of thumb is to give your service account the same license type that your other Power BI users have. At the end of the day, what matters most is knowing whether or not your content resides in a dedicated workspace. If it does not, a Power BI Pro license will probably do the job.
:::

### Multi-factor Authentication

If the Power BI serivce account that you choose to use requires multi-factor authentication, then Displagent will NOT be able to authenticate you to Microsoft and the entire app will not work. Unfortunately, this is not a limitation of Displagent but rather [a limitation within Microsoft's authentication platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth-ropc).

::: danger Multi-factor Authentication
MFA is not supported, so if MFA is required at your company, see if you can provision a service account for Displagent with an MFA exception and restricted Azure access for added protection.
:::