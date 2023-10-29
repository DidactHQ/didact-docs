---
title: Licensing and Monetization
---

# Licensing and Monetization

Didact is an open source platform licensed under the [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) and has a few different monetization options.

::: tip Happy to talk
If you have any questions about licensing or monetization, I'm just an email away: reach out to me at `daniel@didact.dev`, I'm happy to discuss your needs or concerns.
:::

## AGPLv3

Sometimes GPL-based licenses can make developers wary of adopting open source tech for their own use, but that will likely not be an issue for you here.

### Platform vs Library

Again, this is because Didact is offered as an entire, prebuilt platform - not a *library* to be added to your larger software work.

### Isolated Class Library Project

Recall that the central place where your Flows are defined is in a separate, isolated class library project - completely outside of any other code you may be writing. That should sufficiently isolate the rest of your codebase from having to be open sourced per the typical requirements of the AGPLv3.

### Prebuilt Applications

As for Didact Engine, Didact UI, and Didact Sentinel: these are all prebuilt applications already available to you. Ideally, they should exist in a form that is plug-and-play ready where you won't need to modify any of their code. The most you should have to do is modify environment variables in `appsettings.json` files as well as the `didactsettings.json` file from your central class library.

### Benefits

Choosing the AGPLv3 is extremely helpful to me as an open source author. This will help prevent large corporations from taking or redistributing the work without any sort of contribution back to the original source. It should also encourage the community to open up issues and pull requests through Didact's original repos, benefiting the entire community at large.

Chances are, the AGPLv3 license will not affect you or your team in the slightest.

## Sustainability

To help sustain the project long-term, I have a few different ideas for monetization.

### Dedicated Support

I would very much like to see Didact used by developers, teams, and organizations of all sizes. Per the nature of what Didact is, if Didact is adopted into your company, then it will become a central piece of your production infrastructure. No doubt, you and your company will want to ensure that Didact - and myself as its author - stick around to support your company and team's efforts.

On top of the free resources that you can already utilize like GitHub issues, GitHub discussions, and this docsite, I am also offering dedicated, paid support for your team.

See the [Pricing page](https://www.didact.dev/pricing) for details.

### Enhanced Packages

I am currently undecided on this avenue of monetization at the moment, but as is often the case with open source job orchestrators and background job engines, you can purchase enhanced libraries or code repositories from the author to expose advanced, business-friendly or enterprise-critical features in the base-level open source app.

I have not setup a system like this as of yet, and there is no mention of paid packages on the [Pricing page](https://www.didact.dev/pricing) right now. I will continue thinking this over.

### Didact Cloud

And finally, I am also considering offering a cloud-hosting option for you and your company. I want .NET shops and other companies of all sizes to be able to use Didact, and it may very well be the case that you are not interested in self-hosting Didact, whether it be for time constraints, capacity constraints, or some other reason.

I don't necessarily want to ignore this possibility if you and your company are in this position, so I am considering hosting Didact for you myself via Azure.

See the [Pricing page](https://www.didact.dev/pricing) for details.