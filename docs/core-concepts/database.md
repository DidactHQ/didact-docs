# Metadata Database

TODO

## Database Providers

Didact's data model is designed for traditional relational database management systems (RDBMS). The supported database providers are listed below:

| Database Provider | Status |
| --- | --- |
| SQL Server | Supported |
| PostgreSQL | Planned |

### SQL Server

### PostgreSQL

### ORM Philosophy

## Why Not Redis?

Didact's data model is a **highly-relational** data model. It is designed to capture low-level, highly-detailed metadata and easily relate objects to each other within the various modules of the platform. Traditional relational database systems are better designed for this type of data model than Redis is.

Redis is optimized for fast retrieval and key-value lookups. Key-value lookups are an excellent pattern to use *where appropriate*, but this is of little use for a highly-relational data model like Didact's.

This is drastically different from other background job library tools like Hangfire or Sidekiq, for example. In both of those libraries, the object relations are comparatively lightweight and focus more on the serialization of methods, method arguments, and simple configurations of the jobs.

## Distributed Locks

Since Didact's metadata is centrally stored in a relational database, requirements like distributed locks are automatically provided by and synchronized within the platform. This is one of the nice advantages for Didact's chosen architecture: it is extremely simple to run both a single node or multiple nodes/clusters of Didact Engine without requiring cumbersome infrastructure changes.