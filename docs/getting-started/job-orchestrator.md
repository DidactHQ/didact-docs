---
title: What Is A Job Orchestrator?
---

# Job Orchestrator

Here we learn about what a job orchestrator is and why it's useful.

## What Is A Job Orchestrator?

A job orchestrator (sometimes called a durable task engine) is an execution platform to manage various types of jobs.

## Define Job

When I refer to a *job* in this context and within Didact, I'm talking about a background job, a workflow, a data pipeline, or really any chunk of C# code that executes to do something. These jobs can be background jobs, long running jobs, scheduled jobs, or more that you can read about on the [Use Cases](/getting-started/use-cases) page.

Didact has its own terminology for a job which it calls a **Flow**.

::: warning
Do not confuse Flows with execution blocks. Execution blocks run inside of Flows and function as wrappers for `delegates`, but Flows are the heart of the entire Didact Platform. Read on to learn more about them.
:::

## Why Do I Need A Job Orchestrator?

The purpose, then, of Didact as a job orchestrator is to provide a centralized platform to define, execute, and observe these Flows.

### Define Flows



### Execute Flows

Flows are, of course, useless without some sort of job engine to actually execute them. Since Flows are supposed to represent a chunk of C# code to do something, it may not sound like a complicated concept to implement yourself.

But background jobs are deceptively difficult to manage. For example, you may want to configure timeouts, retry policies, different types of triggers, a name and description, and more.

Moreover, it is highly beneficial to have the ability to track individual C# methods and delegates (as well as Flows themselves) and collect important metadata on them like start and stop times, logs, and error stacktraces.

It is often times also crucial to have the ability to easily persist, retrieve, and display this data.

### Observe Flows

Ask any data engineer or software developer about job orchestration, and they will quickly say that one of the biggest purposes of a job orchestrator is to provide the ability to easily observe jobs.

Your team, your managers, or your customers will expect you to properly manage your jobs, and that means you need to easily answer any of the following questions at any time:
- Did Flow X succeed or fail? 
- If it failed, why did it fail?
- What specific method threw the exception?
- How many times did it fail?
- When did the Flow start? When did it stop?
- What Flows are scheduled at the end of the month?
- How Flows have successfully ran in the last 5 minutes?
- What is the status of Flow X now?
- How many worker queues do I have available, and are they load balanced?

This becomes increasingly cumbersome as you have to scale the number of Flows upwards as well as increase their complexity.

Proper observation, then, provides you with execution metrics, exposes line-by-line logs, allows you to manually trigger Flow actions.

<!-- ::: warning Tomato, tomoto
A job orchestrator is also sometimes called a **durable task engine**. The terms are synonymous.
::: -->