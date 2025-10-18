# Setup a database

Didact requires a metadata database to properly orchestrate your Flows, so you need to setup a database. It can be something simple like a local database, a Docker image, or a cloud database.

Read [database providers](/core-concepts/architecture/metadata-database#database-providers) from the Core Concepts to learn what providers are supported.

::: info
You will need to run migrations against this database to setup the data model, but don't worry: that is covered in the next step.
:::