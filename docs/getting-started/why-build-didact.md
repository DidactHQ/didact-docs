---
title: Why Build Didact?
description: An introduction to what the Didact platform is.
---

# Why Build Didact?

So why build Didact? Aren't there other solutions already in place?

## Jealous of Python

I have been jealous for years of the explosion of job orchestrators over in the Python world. It seems to have started with [Apache Airflow](https://airflow.apache.org/) being open sourced from Airbnb, but it's only taken off from there. Now you can find several different orchestration platforms in Python today, such as [Prefect](https://www.prefect.io/) and [Dagster](https://dagster.io/).

They are large, well-documented, and VC-funded, so naturally, as a solo dev/indie hacker, they caught my attention.

## Passion for Data Engineering

Moreoever, as someone whose career started in data analytics and data engineering before becoming engulfed with fullstack software development, I have a particular passion for managing background jobs, data pipelines, and workflows.

## SSIS

I think a great number of .NET developers and SQL Server users are not exactly *thrilled* with the developer experience of SSIS.

Without a doubt, there are still SSIS developer jobs out there, and if a company simply refuses to move away from it, it's completely reasonable to learn the tool if necessary.

But emphasis on the words "if necessary".

Though it may still exist as a critical tool in some enterprises, it does not change the fact that SSIS is horrendously outdated. Even something as simple as a HTTP REST API call are not pleasant to use in SSIS. SSIS exists primarily as a GUI-based ETL tool, and I would be remiss if I didn't acknowledge that it has some nice parts like prebuilt actions for JOINs.

And if that's enough for you: no judgement, that's completely fine.

But, I think, when you look at the tool in its entirety and evaluate its overall developer experience, it generally ranks pretty poorly. It is so difficult for any GUI-based ETL tool to compete with a code-first job orchestrator, especially if that GUI-based tool is so old.

Speaking of that, Microsoft doesn't seem very interested in bringing SSIS up to modern standards. When you look at the new features developed in a year's time for Power BI vs. SSIS, it's clear where Microsoft is and is not allocating their development resources.

## SQL Server Agent Limitations

SQL Server has a very nice builtin system for handling scheduled SQL jobs, called SQL Server Agents. I've used these agents extensively in my own career, and they are an excellent tool for automation.

The problem is, they are *really* limited to only SQL-based operations. *Technically*, you can run Powershell commands, command line scripts, SSIS packages, and .NET CLR stuff inside of SQL Server agents, but I wouldn't call it a painless experience; it's usually quite the opposite.

There is also still the issue of realtime visibility. You can observe the logs of SQL Server agents as they run in a SQL Server instance, but you don't have a degree of observability even remotely close to what you find in a job orchestrator like Apache Airflow.

## Tired of Windows Task Scheduler

Being a developer who has worked in .NET/Microsoft shops his entire career, I soon learned about Windows task scheduler once I started building out data pipelines in .NET console applications.

I greatly appreciate Windows task scheduler for the simple fact that it's free (or at least included in Windows, I should say) and reliable.

But it is depressingly out of date:

- No realtime visibility.
- No modern logging solutions.
- No web-based access from a mobile browser or off-server.
- No granular, method-level tracing.

It just feels like we could do so much better in the .NET ecosystem.

## Too Much .NET Console App Overhead

Another issue is that, from my experience, you would often times have to build a separate .NET console app per pipeline or per set of pipelines.

That just seems like complete overkill these days. Now with modern .NET, each console app has its own generic host builder, its own `appsettings.json` files, its own DI system, and more.

Each individual one has to be setup in Windows task scheduler or as a Windows Service, but it seems like way, way too much overhead and management just to run a set of background jobs or data pipelines.

## Unsatisfied with Libraries

You could argue that we have other solutions in place already, pre-existing background job libraries like Hangfire, Quartz.NET, Coravel, and others.

And don't get me wrong: I think they are solid tools to use for certain use cases.

But I've wanted something *more* than just a library. And several of them don't have user interfaces, or they exist exclusively behind a paywall, or they are abandoned by other open source creators.

I also really like the idea of separating your background jobs and data pipelines into a proper, isolated service, something that isn't intermixed with all of your other application code.

## .NET and Windows Native

And going back to the other tools from other languages like Python, I have found that the developers often ignore Microsoft shops. Windows is usually their last concern, it isn't often considered "sexy" in the startup world, and if they even support Windows, it's usually the furthest behind and least supported.

It would be nice if people like me - whose entire careers have been in .NET shops - had a native .NET solution in place to get the same sort of power you can find in these other language job orchestrators.

## Still Crossplatform

At the same time, I fully recognize that many .NET shops these days use Linux servers for all sorts of purposes, and Docker has exploded in the last few years.

So while I have been wanting something that's easy and simple for traditional Windows-based shops to use, I still very much want a cross-platform solution that's easy for *everyone* to work with.

I can't think of a better cross-platform supported language than modern .NET, it is absolutely superb.