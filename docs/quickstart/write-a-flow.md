---
title: Write A Flow
description:
---

# Write a Flow

Now that you have created your flow library, it's time to create your first `Flow`. We will create a simple flow called  `QuickstartFlow`.

## What is a flow?

A `Flow` is Didact's term for a background job. The flow consists of both metadata and orchestration behavior configurations as well as the actual background job logic.

::: info KISS
See [Flows Overview](/core-concepts/flows/flows-overview) to learn more.
:::

## Create flow class

First, create a new C# class called `QuickstartFlow`.

## Implement IFlow interface

Next, add a reference to the `DidactCore.Flows` namespace and implement the `IFlow` interface onto your class:

```cs
using DidactCore.Flows;

public class QuickstartFlow : IFlow
```
The interface requires two method implementations to complete a flow definition:
- `ConfigureAsync` for setting up the flow's metadata and orchestration behavior.
- `ExecuteAsync` for defining the flow's background job logic.

### ConfigureAsync

The configure method sets up important metadata and orchestration behavior for the flow. This method is executed by Didact Engine when it absorbs a flow library deployment.

The method is provided a `context` object with several utilies, the most important of which is the `IFlowConfigurationContext.Configurator`. The flow's metadata and and orchestration behavior is set by calling fluent API methods against this provided configurator object.

The most important and minimally-essential metadata to define is the flow's `Name` using the `.WithName()` method on the configurator:

```cs
public class QuickstartFlow : IFlow
{
    public Task ConfigureAsync(IFlowConfigurationContext context)
    {
        context.Configurator
            .WithName("quickstart-flow");

        return Task.CompletedTask;
    }
}
```

::: danger Don't forget the name!
Flow names are absolutely required and must be unique per [Didact environment](/core-concepts/environments).
:::

### ExecuteAsync

The execute method defines the actual background job code for the flow. Similar to the configure method, it is provided its own `context` object. The context object comes with useful tools like read-only metadata, an `ILogger`, and a `CancellationToken`, among other utilities.

To keep `QuickstartFlow` simple, let's use the context logger and simulate work being done:

```cs
public class QuickstartFlow : IFlow
{
    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        context.Logger.LogInformation("Simulating work...");
        await Task.Delay(1000);
    }
}
```

## Complete definition

Now let's combine both code snippets to create a fully-formed flow:

```cs
public class QuickstartFlow : IFlow
{
    public Task ConfigureAsync(IFlowConfigurationContext context)
    {
        context.Configurator
            .WithName("some-flow");

        return Task.CompletedTask;
    }

    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        context.Logger.LogInformation("Simulating work...");
        await Task.Delay(1000);
    }
}
```