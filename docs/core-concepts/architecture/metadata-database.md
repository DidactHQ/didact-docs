---
title: Metadata Database
description: One of the core components of the Didact platform is the metadata database. We discuss the supported SQL providers and database architecture.
---

# Metadata Database

One of Didact's core components is a metadata SQL database.

## Database Providers

Didact's data model is designed for traditional relational database management systems (RDBMS). The supported database providers are listed below:

| Database Provider | Status |
| --- | --- |
| SQL Server | Supported |
| PostgreSQL | Planned |

### SQL Server

My first database target is SQL Server which may come as a surprise to some. I have a few different reasons for prioritizing this specific RDBMS.

First and foremost, SQL Server and Transact SQL are my "native SQL language" so to speak. For the majority of my personal career, I have spent almost all of my time interacting with and mastering TSQL. Naturally, I want to use the technology that I have already mastered when building new products for the sake of delivering quick iterations.

Secondly, it should come as no surprise to anyone that a large number of dotnet shops also use SQL Server instances or Azure SQL databases. Modern dotnet - thanks to the efforts of .NET Core and .NET 5+ - are totally cross-platform frameworks, making dotnet a wonderful tool of choice for the most versatile systems in the world, from game development to Linux web servers to desktop apps. However, though it may not be considered "cool" or "sexy" by today's tech influencers, it still stands that a large number of companies run Windows Servers and SQL Server instances, and many of them are on premises via dedicated host machines locked away in a company server room. There are also a large number of companies and indie developers and entrepreneurs that run Azure SQL databases or SQL Server instances in the Azure and AWS cloud platforms.

I want to meet these companies with the technology that many of them are already using and are familiar with. Ideally, this should help with Didact's adoption and make it feel that dotnet is truly first-class, even some of the more outdated parts of it.

### PostgreSQL

That being said, I am very much aware that a large number of the global dev community would protest and unquestionably name PostgreSQL as their preferred SQL provider. And it makes sense as to why:

* Postgres is an open source, permissively-licensed RDBMS. SQL Server is *not* open source and is quite expensive to license from Microsoft.
* Postgres has a massive global community of developers and database administrators, and it seems to be growing more and more every day.
* Specifically from my personal experience, I have also noticed that Postgres is, by and large, the de facto RDBMS of choice for many startups and SaaS companies.

These are all very legitimate reasons to use Postgres, and I don't want to ignore this RDBMS and its massive ecosystem, so Didact *will be* coming to Postgres, don't worry. It may just be a bit delayed vs. SQL Server.

### Other Providers

At the moment, the only two database providers that I am targeting are SQL Server and PostgreSQL. If demand is there for it, I would also consider MySQL.

If you use another SQL provider outside of those three, please contact me to let me know what that provider is and why you cannot use one of those three SQL providers. I am always open to discussing further deployment options.

## Why Not Redis?

Didact's data model is a **highly-relational** data model. It is designed to capture low-level, highly-detailed metadata and easily relate objects to each other within the various modules of the platform. Primary keys are heavily used almost everywhere, as Didact's data model is heavily normalized. Traditional relational database systems are better designed for this type of data model than Redis is.

Redis is optimized for fast retrieval and simple key-value lookups. Key-value lookups are an excellent pattern to use *where appropriate*, but this is of little use for a highly-relational data model like Didact's.

This is drastically different from other background job libraries like Hangfire or Sidekiq, for example. In both of these libraries, the object relations are comparatively lightweight and focus more on the serialization of methods, method arguments, and simple configurations of the jobs.

## ORM Philosophy

I am taking what you might call a hybrid approach to using an ORM. Specifically, since Didact is a dotnet-centric platform, the ORM I would use would is, of course, Entity Framework Core.

When I first considered whether or not to use EF Core, I was leaning towards *not* using it for a few different reasons:

* I mastered SQL before I started my career in dotnet and C#, so I'm very familiar with and very comfortable with writing SQL first-hand.
* I'm trying to use as few dependencies as possible in Didact Engine.
* I'd heard previous horror stories about the abysmal performance of EF Core queries.
* I have experience using micro ORMs like Dapper and have had great success with them.

However, upon further reflection, I realize that an ORM like EF Core *does* offer some powerful advantages for me:

* Targeting multiple SQL providers becomes much easier since the provider-specific SQL syntax is abstracted away.
* Writing raw SQL queries, even when using a micro ORM like Dapper, is quite time-consuming.
* Writing basic CRUD queries is a bit... annoying. It's a lot of copying and pasting the same basic strings over and over.
* EF Core includes built in utilities for managing database migrations which is a must-have for Didact.

So what I've landed on, at least for the moment, is a hybrid system for using *both* EF Core and Dapper:

* EF Core will manage database migrations.
* EF Core will generate *only* the most simple CRUD queries, queries that have no chance of being poorly optimized by EF Core's engine that would just be a simple waste of time for me to hand write.
* All other concerns will, by default, resort to hand-written SQL statements and the Dapper micro ORM.

## Distributed Locks

Since Didact's metadata is centrally stored in a relational database, requirements like distributed locks are automatically provided by and synchronized within the platform. This is one of the nice advantages for Didact's chosen architecture: it is extremely simple to run both a single node or multiple nodes/clusters of Didact Engine without requiring cumbersome infrastructure changes.

## Performance Optimizations

Because Didact's data model is quite verbose and is intended to capture and store a variety of metadata, Didact Engine will frequently interact with the SQL database.

I have noticed that people have a strange tendency to grossly-miscalculate the load that a modern RDBMS like SQL Server or PostgreSQL - or even SQLite for that matter! - can handle on modern server hardware. I've read previous posts and blogs about 10,000 reasons why SQL can never be used as a queueing system, why extremely-complex Kafka instances and other such infrastructure components are required, and so on.

But here's the truth of it: a modern RDBMS, with sufficiently-provisioned compute hardware, with indexed tables and finely-tuned databases, interacted upon by intelligently-crafted SQL queries, and maybe surrounded by a caching layer, can handle **nearly anything**.

I'm a firm believer that modern RDBMS's are among the most stable, battle-tested, and performant software tools in the world.

As such, I will be taking great care to ensure Didact's data model is properly constructed and optimized for your usage, and I will provide various guides and how-to articles on this docsite to help you should you encounter some performance and/or scaling issues with your Didact database.