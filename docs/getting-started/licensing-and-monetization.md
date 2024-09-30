---
title: Licensing and Monetization
---

<script setup>
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
</script>

# Licensing and Monetization

## Sustainability

I am a firm believer in open source sustainability and am aware of how many devs in the open source community struggle with this. Open source software has fundamentally changed this world for the better, but the fact remains that its quite difficult for most people to work on free open source software for years on end with no compensation.

I also think creating and maintaining a software product of this immense a magnitude would be infeasible in the long-term without some sort of monetization plan.

A little about me:
* I am a solo founder and solo dev.
* I am bootstrapped. I have raised $0.00 of funding, my personal money is what has kickstarted this product.
* I have no cofounders and no employees.

Contrast that with any of the other job orchestrators in existence - such as the Pythonic job orchestrators - and you will find that they are maintained by entire engineering teams who are funded by organizations having raised **tens of millions of dollars** in venture capital funding.

Unless that needs to change for some drastic reason one day, **that is not the path I am on**. And in many senses, I actually believe being a solo founder is a massive advantage. However, I simply do not have the financial cushion to live for years on end building Didact without a solid business model empowering it.

## Monetization

### Open Core

Concordantly, I have chosen to create an open core business model to sustain Didact long-term. Open core software is a subsect of commercial open source software (COSS) where the core software product is licensed under a standard open source license (more on that below) and monetized with enhancements, dedicated support, alternative licensing if necessary, and so on. After a great deal of consideration, research, and learning how the other solopreneur bootstrapper pros have done it, I feel that this is the optimal path forward for my business.

I want a powerful, game-changing, almost addictively-pleasant-to-use open source core product that individuals, hobbyists, and businesses can use to their hearts' delight under a trustworthy open source license. And then, if they want some enhancements, dedicated support, and so on, I want to offer that as an incentive to both **get more value from the software product** while also **helping me sustain it long-term**.

### Bootstrapped

And here's the great thing about being a bootstrapper like me: **I do not *need*** and **I do not *want*** a billion-dollar, mega-unicorn company. I don't need billions of dollars or a 1,000x return for this product to be a success. If I can, at the very least, get my bills paid with this product, and then some, that will be more than *I ever dreamed possible* with an open source product.

Another great thing about being a bootstrapper: if not by skills or luck, I win by war of attrition. I have no choice but to figure out the business side from day one, but once I do, I'm good to go for a very, very, very long time. And if the goings get tough, if the economy sucks, whatever - I won't get shutdown by an investor who hasn't gotten a big enough return for their portfolio.

This is a passion project, a labor of my deepest love for dotnet and data engineering: **I am not going anywhere anytime soon**.

### Support

You can see more details on the [Pricing page](https://www.didact.dev/pricing), but under the core product, you have GitHub issues and GitHub discussions to help you report bugs, request feature enhancements, and so on. And for some of you, that may be more than sufficient to get you going.

However, I suspect that at least some of you - I think many of you - will want to run Didact in a live, production environment **where a real business is depending on it**. I know how absolutely critical a job orchestrator like this is to a business's success. I also know that some businesses are afraid of open source software because they don't want to adopt unsupported software that may leave them backed into a corner if something breaks and they don't have anyone to reach out to.

I get it, and I wanted to dispell any fears you or your business may have by something in Didact breaking, so that's why I offer dedicated support for the paid versions of Didact.

### Self-Hosted

One more thing: I think I made this pretty clear in the rest of the documentation, but just to clarify once more: Didact is not a SaaS product, **it's a self-hosted product**. All of my early adopters and users have indicated that they would rather host and run Didact themselves on their own infrastructure, and I completely understand why.

#### License Server

The only SaaS part of Didact is the license checker mechnism built into the platform: when you purchase paid versions of Didact, one of the benefits you purchase are enhanced features and functionality. You receive an API key from me that makes periodic checks to a license server that I host to confirm you are a paid customer, and upon validation, the enhanced parts of the platform are unlocked for you.

I know that some users or businesses might be a little concerned about requiring periodic checks with a license server in my cloud, but I have several mitigations for these concerns:
1. I will be launching a public status page for the licensing server where you can see server uptimes.
2. I will be hosting my license server on highly available Azure resources. Azure is a world-class, enterprise-grade hosting platform, so it can certainly handle a miniscule license server.
3. I am building **failsafe modes** into Didact's applications where, for example, if my server goes offline for some reason or you lose internet connection temporarily, your enhanced version of Didact will continue functioning as is for a certain duration. The higher-tier paid plan you purchase, the more liberally-extended failsafe duration your Didact uses. The mechanics of this are discussed in more detail elsewhere in the docs.
4. I am building a notification system within Didact itself for you to configure so that you can be instantly notified if any license checks fail.
5. I will also provide a reporting page in Didact UI for you to observe the license server validation attempt history.

### Pricing Page

So if you'd like to see what incentives I have for the paid versions of Didact, come check out the [Pricing page](https://www.didact.dev/pricing) on the main site.

## Licensing

Which finally brings us to the licensing part.

tl;dr;

Didact is a dual-licensed, open core software product where the core/majority of the software is licensed under [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) and the enhanced parts of the software are licensed under a separate, commercial license.

### AGPLv3

I could hear some of you wincing when you read "AGPLv3", but don't freak out! Let me explain this license and how it works with Didact because it will be perfectly fine to use for 99.99999999% of you.

Thankfully, as the years have passed by, more and more people have come to understand the proper implications of AGPLv3, but unfortunately there are still misinterpretations of it floating around on the internet. What we have to establish, in my non-lawyer terminology, is the "scope".

#### Application Space

Perhaps the most important question to ask when using an AGPLv3 product is this: is the software in question a *library* (that is meant to be integrated into your larger software work) or is it a standalone, self-contained *application* or *platform*?

In Didact's case, Didact is a standalone, self-contained *platform* of multiple, prebuilt *applications* that you are supposed to take as is, without needing to modify any source code, and get them up and running on your server infrastructure. [Didact is *not* a library](/getting-started/what-is-didact#standalone).

Because Didact falls under application space, the scope of the AGPLv3 license stops with Didact's own programs, meaning the AGPLv3's copyleft clauses will not "infect" your other proprietary software.

#### Example Scenarios

For example, let's say you setup Didact to run on some Windows or Linux server at your company for internal use. No problem, feel free to setup Didact's applications and get to orchestrating! Didact will be running as a self-contained microservice in this example, so all of the AGPLv3 copyleft restrictions remain scoped only to Didact's own programs.

Another example, let's say that your company runs a SaaS app, and on some backend server somewhere, you have Didact running CRON jobs for you *all of which is invisible to your end users*. Didact's AGPLv3 license is scoped only to Didact's own programs in this case, so you are free to use it to your heart's delight without worry of the copyleft clauses "infecting" your SaaS product.

This is why I said above that for 99.99999999% of you, the AGPLv3 license will be perfectly fine.

#### Configuration vs Modification

One other clarification: for environment variable files like an `appsettings.json` file or an `.env` file, that is considered a configuration and not a modification of Didact's applications, so these files will not trigger the copyleft restrictions of AGPLv3.

On the other hand, if you were to open and modify the `Program.cs` file of Didact Engine, for example, then that *would* be considered a modification to the application's source code and would trigger the copyleft. Instead, if you want something like that changed, I would encourage you to either:
1. Open a GitHub issue and request a feature enhancement.
2. Email me if you are a paid customer and ask for a prioritized feature enhancement (one of the benefits of purchasing a paid plan).
3. Modify the source code and distribute it under the terms of the AGPLv3.

#### Contact Me

Of course, if you have a scenario that you feel is highly unusual, or if you just want to ask some questions about the licensing, feel free to reach out to me at {{ contactEmail }}.

### LGPL

Didact does in fact have a few libraries for you to use, namely, the Didact Core nuget package that you have to use to actually create your Flows.

Not to worry, though: Didact's nuget packages are [LGPL licensed](https://choosealicense.com/licenses/lgpl-3.0/), meaning you are free to use them to create your Flows and Flow Libraries. No copyleft restrictions will befall you unless, for example, you wanted to modify the source code of these nuget packages.

Otherwise, feel free to use the nuget packages as is. They will **NOT** force you to open source your Flow Libraries (after all, that would be kind of insane for me to expect).

### Commercial license

And finally, we have the commercial license for the enhanced parts of the Didact Platform. This commerial license restricts the usage of Didact's enhanced features which have been modularized into separate libraries for the frontend and backend applications.

Right now, I am not requiring an API key/login to access these enhanced libraries. Instead, what I have elected to do is provide their build artifacts publicly (meaning you do not need an API key/login to download them at build time or in CICD pipelines), but the build artifacts are licensed under this commercial license rather than AGPLv3 or LGPL.

The commercial license basically states that:
1. The enhanced libraries can ONLY be used with the official Didact source code from the official Didact code repositories.
2. The enhanced libraries can NOT be used with any forks of Didact's codebase, even if the forks are legitimate AGPLv3 or LGPL forks.
3. The enhanced libraries can NOT be used with any versions of Didact's programs where someone has removed or modified the license checker modules.

This approach is more risky for me because bad actors might try to abuse my platform and licensing structure, but it's more convenient for you because it's dead simple to get Didact up and running. With this approach, I do not have to dispense private API keys to library files and so on.

I will accept this risk for now and will only change this approach if Didact suffers from widespread abuse (which will hopefully not happen).