---
title: What Is Didact?
description: An introduction to what the Didact platform is.
---

# What Is Didact?

Didact is an open source, standalone, fullstack, atomic .NET job orchestation platform. Almost the entire platform is written exclusively in C# with the exception of Didact UI, which is a VueJS-powered web dashboard.

## Code First

As a developer myself, I love using code to solve problems. Although they have their place, I am often turned off from no-code/low-code platforms for data engineering and background job processing. At the end of the day, code allows you, the developer, to be as creative and innovative as you want, and I wanted Didact to support that creativity.

As such, when you are designing your background jobs, data pipelines, and workflows, Didact is a code-first solution: no drag-and-drop builders, no complicated GUI, just raw C# code.

## Platform vs. Library

One very important distinction that I would like to make right from the beginning is that Didact is a **platform**, *not a library*.

Contrary to other .NET background job libraries like Hangfire, Quartz.NET, and Coravel, Didact is **not** meant to be a set of nuget packages that you add to a pre-existing application. Rather, Didact is self-contained, entirely independent of and separate from other applications. This opens up a plethora of interesting use cases and implementations for Didact which you can read more about on the [Use Cases](/getting-started/use-cases) page.

## Architecture

Specifically, Didact has several different sub-applications that are **pre-written** and offered to you **as is**, namely:

* Didact Engine: the .NET Web API that doubles as both the REST API and the main execution engine for your background jobs, called Flows.
* Didact UI: the VueJS web dashboard frontend.
* Didact Sentinel: the console application that functions as a watcher and helper for Didact Engine.
* Didact Core: the primary nuget package that exposes important classes and interfaces for your Flows and Blocks.

::: info
Even though Didact Core is a nuget package, it is still not meant to be added to a pre-existing application. Rather, it will be used in your new class library project where you create your Flows. More on that later.
:::

These applications are designed in such a way that your background job processing, data pipelines, and workflows work more as a plug-and-play system. Your only concern should be deploying these applications as-is and then designing your Flows in your class library project.

I go into a deep dive of the architecture on the dedicated [Architecture](/concepts/architecture-survey) pages.

## Open Source

Didact's codebase is open source and available for inspection, forking, and modification on [GitHub](https://www.github.com/DidactHQ). It is offered under the AGPL3.0 open source license, and I am attempting to monetize the project with paid support and cloud hosting which you can view on the main site's [Pricing](https://www.didact.dev/pricing) page.

::: warning Deep breath
If you recoiled from seeing the AGPL3.0 license, I have some good news for you: **don't worry**.

I mentioned above that Didact *is not a library*, **it is a standalone platform**. This means that there is a 99.9% chance the AGPL3.0 license will not affect you whatsoever. Read more about it on the [Licensing and Monetization](/getting-started/licensing-and-monetization) page.
:::