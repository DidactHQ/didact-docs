---
title: Didact Engine
description: Didact Engine doubles as both a dotnet web API and execution engine for your Flows. Didact Engine is a critical component of Didact's architecture.
---

# Didact Engine

Here we discuss the purpose and intentions behind Didact Engine. In simplest terms, Didact Engine is a dotnet web api app, but there's a great deal of thought behind how specifically it has been built.

## Multipurpose

Didact Engine is a multipurpose dotnet web api that implements two critical functions.

### Execution Engine

First and foremost, Didact Engine is, per the name, the execution engine for the Didact platform. This application is responsible for the management of your Flows, from integration of Flow metadata to the database, execution of FlowRuns, and FlowRun error handling.

Error handling is implemented with particular care since Didact Engine is intended to run any number of FlowRuns simultaneously. Didact Engine is not tied to a specific 

### REST API

Didact Engine also doubles as a convenient REST API for the Didact platform. The engine contains a wide assortment of endpoints that expose the metadata of Didact's vast data model, such as Flows, FlowRuns, Engine Tunings, and more.

Since Didact UI is a single page app, it does not directly communicate with the database. Instead, Didact UI executes http calls to Didact Engine's various REST endpoints to interact with the database metadata.

The REST API is also there for your convenience; if you have special reporting or dashboarding needs that you wish to build yourself, the REST endpoints are there to help easily expose and distribute the database metadata.

## Single Process

One of the nice advantages of Didact Engine being built with C# is that it is a **truly multithreaded** application. Didact Engine does not require multiprocessing or the management of multiple subprocess constructs, such as worker threads in NodeJS, in order to utilize multiple cpu cores on your host machine.

As you probably know, multiprocessing consumes large amounts of memory from your available RAM; to utilize multiple CPU cores on your host machine by way of multiprocessing, you must sacrifice a substantial amount of memory per additional process created. Multiprocessing, compared to true multithreadedness in languages like C#, Java, and Go, is an inefficient usage of resources that equates to a worse `memory : cpu core` ratio.

Ultimately, this results in more money spent on larger amounts of infrastructure for similar levels of job throughput. On the contrary, the C# language is naturally multithreaded, so this is not an issue for C# applications like Didact Engine.

## Ease of Deployment

One of the major benefits of modern dotnet is the incredible ease of cross-platform deployment strategies.

Since Didact is built with modern dotnet versions, it can be built and published as a self-contained, single-file executable. As is typical with self-contained executables, you don't even need dotnet installed on the target machine: the required framework .dll files are packaged into the executable!

This makes Didact **extremely easy** to get up and running on essentially any infrastructure with little effort on your part. Simple infrastructure requirements should make your adoption of Didact that much easier.