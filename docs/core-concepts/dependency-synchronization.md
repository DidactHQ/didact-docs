---
title: Dependency Synchronization
---

# Dependency Synchronization

When the `Flow Library` is updated with a new version and published to its publish location, we want all running instances of Didact Engine to detect the new set of `.dll` files, shutdown, restart, and absorb the new `.dll` files at engine startup.

Specifically, if we are running multiple instances of Didact Engine, we want each instance to do this gracefully. By gracefully, we mean that we want a Didact Engine instance to finish running its active Flows, prevent new Flows from being activated, and then initiate the restart process.