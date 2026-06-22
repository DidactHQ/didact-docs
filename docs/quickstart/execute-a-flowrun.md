---
title: Execute a FlowRun
---

# Execute a FlowRun

Now that `FlowLibrary` has been successfully deployed, it's time to execute a FlowRun for `QuickstartFlow`.

## Start apps

Open two terminal windows, one for Didact Engine and the other for Didact UI, and run the following [start commands](/api/didact-cli/start):

```bash
didact start engine
```

```bash
didact start ui
```

## Didact Engine

Automatically, Didact Engine should be reach out to `FlowLibrary`'s filesystem deployment, shadow copy it, and run flow configurations for the library.