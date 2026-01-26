---
title: Flow Versioning
description:
---

# Flow Versioning

In a Flow's `ConfigureAsync` method, you can assign a FlowVersion using the `AsVersion()` method on the configurator:

```csharp
public class SomeFlow : IFlow
{
    public Task<IFlowConfigurationContext> ConfigureAsync(IFlowConfigurationContext context)
    {
        context.Configurator
            .WithName("some-flow")
            .AsVersion("v1.1.0")

        return Task.FromResult(context);
    }
}
```