---
title: Why Build Didact?
description: An introduction to what the Didact platform is.
---

# Why Build Didact?

So why build Didact? Aren't there other solutions already in place?

## Jealous of Python

I have been jealous for years of the explosion of job orchestrators over in the Python world. It seems to have started with [Apache Airflow](https://airflow.apache.org/) being open sourced from AirBnB, but it's only taken off from there. Now you can find several different orchestration platforms in Python today, such as [Prefect](https://www.prefect.io/) and [Dagster](https://dagster.io/).

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

## Too Many .NET Console Apps

Another issue is that, from my experience, you would often times have to build a separate .NET console app per pipeline or per set of pipelines.

That just seems like complete overkill these days. Now with modern .NET, each console app has its own generic host builder, its own `appsettings.json` files, its own DI system, and more.

Each individual one has to be setup in Windows task scheduler or as a Windows Service, but it seems like way, way too much overhead and management just to run a set of background jobs or data pipelines.