---
title: What Is Didact?
description: In this article, we introduce Didact as the premiere .NET job orchestrator. We note that Didact is code-first, fullstack, standalone, and open source. We also briefly survery its architecture.
---

# What Is Didact?

Didact is an open source, standalone, fullstack .NET job orchestration platform. Almost the entire platform is written exclusively in C# with the exception of Didact UI, which is a VueJS-powered web dashboard - though it is still wrappped within a C# app.

## Code First

As a developer myself, I love using code to solve problems. Although they have their place, I am often turned off from no-code/low-code platforms for data engineering and background job processing. At the end of the day, code allows you, the developer, to be as creative and innovative as you want, and I wanted Didact to support that creativity.

As such, when you are designing your background jobs, data pipelines, and workflows, Didact is a code-first solution: no drag-and-drop builders, no complicated GUI, just raw C# code.

## Fullstack

Many background job libraries and job orchestrators in .NET don't ship with a user interface of any kind. There are a few exceptions here and there like Hangfire, but often times you are lucky if you even find a legible README.md in the project's repo.

Didact ships with a VueJS web dashboard, powered by Tailwind CSS and some nice UI libraries. It's aptly named [Didact UI](https://github.com/DidactHQ/didact-ui).

## Standalone

One very important distinction that I would like to make right from the beginning is that Didact is a **platform**, *not a library*.

Contrary to other .NET background job libraries like Hangfire, Quartz.NET, and Coravel, Didact is **not** meant to be a set of nuget packages that you add to a pre-existing application. Rather, Didact is self-contained, entirely independent of and separate from other applications. This opens up an array of interesting use cases and implementations for Didact which you can read more about on the [Use Cases](/getting-started/use-cases) page.

## Architecture

Specifically, Didact has several different sub-applications that are **pre-written** and offered to you **as is**, namely:

* Didact Engine: the .NET Web API that doubles as both the REST API and the main execution engine for your background jobs, called Flows.
* Didact UI: the VueJS web dashboard frontend.
* Didact CLI: the .NET CLI that allows you to manipulate both your flow libraries and Didact's application components.
* Didact Core: the primary nuget package that exposes important classes and interfaces for your Flows and Blocks.

::: info
Even though Didact Core is a nuget package, it is still not meant to be added to a pre-existing application. Rather, it will be used in new class library projects, called **Flow Libraries**, where you write your Flows. More on that later.
:::

All of this content is aggregated under a primary, release repository simply named [Didact](https://github.com/DidactHQ/didact).

These applications are designed in such a way that your background job processing, data pipelines, and workflows work more as a plug-and-play system. Your only concern should be deploying these applications as-is and then designing your Flows in your flow libraries.

## Isolation

The actual magic where your background jobs and data pipelines run is defined in separate class library projects called flow libraries. These class libraries are where you define your Flows, a term synonymous in the Didact Platform with background job, data pipeline, or workflow.

::: info
I emphasize the word **isolation** because these class libraries exist *outside of* any pre-existing application source code that you have; they are standalone .csproj's.
:::

## Plugin

Following from the [isolation](/getting-started/what-is-didact#isolation) aspect of flow libraries, they are dynamically loaded into Didact Engine *at runtime as plugins*. This yields an extremely adept, nimble, and highly flexible job management and reference system where Didact Engine can absorb and dispose of flow libraries as needed. Many benefits follow from this approach, like zero-downtime flow library deployments and making Didact Engine an ["Always On" application](/core-concepts/architecture/didact-engine#always-on).

## Open Core

Didact is an **open core** platform of, primarily, prebuilt software applications and a user-facing nuget package library. The source code for the applications is dual-licensed, where proprietary parts of the code are licensed under a COMM license and where the rest of the code is licensed under the AGPLv3. The nuget package library is licensed under the more-permissive LGPL which is typical for user-facing nuget packages.

Open core dual-licensing is a business strategy for founders who, like myself, want to build powerful, open source-friendly* software but want to do so responsibly and sustainably by backing the product with an actual business model.

::: warning Words matter*
To try and respect the differences between free open source software (FOSS) and commercial open source software (COSS), and to prevent any confusion amongst users, I usually refer to Didact as **open core** so that everyone is on the same page.
:::

I have chosen the open core approach not to scare you and not to burden your acquisition department at your company but so that, as I stated above, I can provide **sustainable, long-term support** for this product for years to come. Open core products are extremely popular amongst devtools, as they pretty much always offer gratuitous free/community versions with enhanced versions, upgrades, and support avaiable upon purchase.

It is notable, also, that I am a **solo bootstrapped founder**, not VC-backed, so I want things done right without interferences between me (the founder) and you (my user). I thought long and hard about the various approaches available to me, and this felt like the best path forward.

::: warning Fear not
If you recoil at the sight of COMM license, AGPLv3, or "open core", worry not: the large majority of you will likely have zero interest in forking and will instead just want to use the platform as is; in other words, chances are you probably don't care about this section. I offer a gratuitous free/community version of Didact that is hassle-free to get started with, and I expound more on being a bootstrapped founder elsewhere, so make sure to read the [Licensing and Monetization](/getting-started/licensing-and-monetization) page if you want to see more of my thoughts in detail about these matters.
:::