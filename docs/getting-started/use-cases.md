---
title: Use Cases
description: In this article, we explore the various use cases of Didact as a .NET job orchestrator. In particular, we observe that Didact is perfectly built for background jobs, data pipelines, etl, and microservice adoption.
---

# Uses Cases

Didact is ideal for several different use cases.

## Background Jobs

Asynchronous, parallelizable, reliable, and persistent background jobs are often a critical piece of production infrastructure for a business of any size, from the smallest to the largest of operations.

Software designed to handle this job function (pun intended) needs to be highly performant, expose a high degree of observability, capture critical logging events, and be well-documented.

## Long Running Jobs

Long running tasks are also a common need for many industries. Rather than hang up an HTTP request for an overextended amount of time, many developers prefer to offload long running tasks to an asynchronous, queue-based process. Didact provides a powerful SQL-based queue with maximum obervability through Didact UI, allowing you to offload expensive operations and time-consuming work to a dedicated service on your backend and free up your client.

## Scheduled Jobs / CRON Jobs

Ask any .NET developer about reoccurring scheduled jobs, and chances are they have built and launched a .NET console application on Windows task scheduler or as a Windows service. Whether it's every X minutes, the first of the month, or some obscure CRON schedule, it's a common need for a team of any industry, for customers or for internal use, and often times very critical to business operations. Scheduled jobs are an essential piece of any job orchestrator and a direct use case for what Didact as your .NET job orchestrator.

## Data Pipelines and ETL

Perhaps under the umbrella of background jobs, many a .NET developer or data engineer find themselves needing to build some sort of data pipeline.

Moving data, transforming data, loading and unloading data: no matter what, *something* needs to actually orchestrate the execution of all these commands, and *you* need the ability to observe what's happening.

## Microservices and Isolation

And speaking of background jobs and data pipelines, there is also the question of *how* and *where* you want to run them.

With other libraries like Hangfire or Quartz.NET, sure, you can run your automations inside of a main application, but what if you'd rather not do that?

These days, microservices and containerization are all the rage, and I think it would be nice to offer an orchestration solution that naturally fits into those patterns.