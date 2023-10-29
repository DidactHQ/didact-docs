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

So while I have been wanting something that's easy and simple for traditional Windows-based shops to use, I still very much want a cross-platform solution that's easy for everyone to work with.

I can't think of a better cross-platform supported language than modern .NET, it is absolutely superb.