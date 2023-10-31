---
title: Use Cases
---

# Uses Cases

Didact is ideal for several different use cases.

## Background Jobs

Asynchronous, parallelizable, reliable, and persistent background jobs are often a critical piece of production infrastructure for a business of any size, from the smallest to the largest of operations.

Software designed to handle this job function (pun intended) needs to be highly performant, expose a high degree of observability, capture critical logging events, and be well-documented.

## Data Pipelines and ETL

Perhaps under the umbrella of background jobs, many a .NET developer or data engineer find themselves needing to build some sort of data pipeline.

Moving data, transforming data, loading and unloading data: no matter what, *something* needs to actually orchestrate the execution of all these commands, and *you* need the ability to observe what's happening.

## Microservices and Isolation

And speaking of background jobs and data pipelines, there is also the question of *how* and *where* you want to run them.

With other libraries like Hangfire or Quartz.NET, sure, you can run your automations inside of a main application, but what if you'd rather not do that?

These days, microservices and containerization are all the rage, and I think it would be nice to offer an orchestration solution that naturally fits into those patterns.