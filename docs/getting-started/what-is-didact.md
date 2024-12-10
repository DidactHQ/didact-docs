---
title: What Is Didact?
description: In this article, we introduce Didact as the premiere .NET job orchestrator. We note that Didact is code-first, fullstack, standalone, and open source. We also briefly survery its architecture.
---

# What Is Didact?

Didact is an open source, standalone, fullstack .NET job orchestration platform. Almost the entire platform is written exclusively in C# with the exception of Didact UI, which is a VueJS-powered web dashboard.

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

* [Didact Engine](https://github.com/DidactHQ/didact-engine): the .NET Web API that doubles as both the REST API and the main execution engine for your background jobs, called Flows.
* [Didact UI](https://github.com/DidactHQ/didact-ui): the VueJS web dashboard frontend.
* [Didact Core](https://github.com/DidactHQ/didact-core): the primary nuget package that exposes important classes and interfaces for your Flows and Blocks.

::: info
Even though Didact Core is a nuget package, it is still not meant to be added to a pre-existing application. Rather, it will be used in your new class library project where you create your Flows. More on that later.
:::

And for simplicity's sake, all of these applications are aggregated and offered under a primary, release repository simply named [Didact](https://github.com/DidactHQ/didact).

These applications are designed in such a way that your background job processing, data pipelines, and workflows work more as a plug-and-play system. Your only concern should be deploying these applications as-is and then designing your Flows in your class library project.

## Isolated

The actual magic where your background jobs and data pipelines run is defined in an isolated, central class library project. This is where you define your Flows, a term synonymous in the Didact Platform with background job, data pipeline, or workflow.

Your Flows exist in this class library project, totally separate from the rest of your codebase.

## Open Source

Didact is a commercial open source platform whose source code is available on several different [GitHub repositories](https://www.github.com/DidactHQ). It is released under the AGPLv3 open source license and offers a few different monetization options for project sustainability.

See the [Licensing and Monetization](/getting-started/licensing-and-monetization) page for more details.

::: warning Deep breath
If you recoiled from seeing the AGPLv3 license, **don't worry**. Chances are it will not affect you. Make sure to read the [Licensing and Monetization](/getting-started/licensing-and-monetization) page for more details.
:::