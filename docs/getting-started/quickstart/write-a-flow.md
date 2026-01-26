---
title: Write A Flow
description:
---

# Write a Flow

Now that you have your Flow Library, it's time to create your first `Flow`. Flows are Didact's terminology for a job.

On this page, we will reference a sample Flow called `SomeFlow`.

## Create new class

First, create a new C# class called `SomeFlow`.

## Implement IFlow interface

Next, add a reference to the `DidactCore.Flows` namespace and implement the `IFlow` interface onto your class.

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
```

::: warning Learn more
These subsections will only cover the most essential parts of defining a Flow to keep the Quickstart simple. However, there are many advanced configurations that you have at your disposal when defining a Flow, so make sure to check out the [Flow Overview](/core-concepts/flows/flows-overview) in Core Concepts.
:::

### ConfigureAsync

The first method that you need to implement for the `IFlow` interface is the `ConfigureAsync` method.

The `ConfigureAsync` method enables you to set crucial metadata for your Flow that is then synchronized to the metadata database by Didact Engine when it consumes a Flow Library.

#### Fluent API

You now need to define the `ConfigureAsync` method and set SomeFlow's metadata. The `IFlowConfigurator` interface provides some convenient metadata builder methods to call in a sleek, easy-to-use fluent API.

The metadata fluent API has many different methods that you can call, but for this Quickstart, I will only show the essential ones below:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    public Task<IFlowConfigurationContext> ConfigureAsync(IFlowConfigurationContext context)
    {
        context.Configurator
            .WithName("some-flow");

        return Task.FromResult(context);
    }
}
```

#### Async signature

You may notice that `ConfigureAsync` is an asynchronous method that wraps `IFlowConfigurator` in a `Task`, but many - if not all - of your metadata values will likely be static, hard-coded, or synchronous values.

That's ok, just use `return Task.FromResult()` to satisfy the method signature.

::: tip Why async?
If you're wondering why the configure method is asynchronous when your metadata is probably hard-coded, check out [Async signature](/core-concepts/flows/flows-overview#async-signature) in Core Concepts.
:::

### ExecuteAsync

The second method that you need to implement for `IFlow` is the `ExecuteAsync` method.

This method is the heart of the Flow where you define the actual work to be done. Since it's just an ordinary method, it can do anything that you want it to, so make sure to check out the [Flow Overview](/core-concepts/flows/flows-overview) in Core Concepts to learn more.

For the moment, let's define something simple. Add the following statements to `ExecuteAsync` to simulate an execution:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    public Task<IFlowConfigurationContext> ConfigureAsync(IFlowConfigurationContext context)
    {
        context.Configurator
            .WithName("some-flow");

        return Task.FromResult(context);
    }

    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        var logger = context.Logger;
        logger.LogInformation("Simulating work...");
        await Task.Delay(5000);
        logger.LogInformation("Work complete.");
    }
}
```

Congratulations, you just wrote your first Flow!