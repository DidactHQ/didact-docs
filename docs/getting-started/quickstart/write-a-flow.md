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
{
    public SomeFlow() { }
}
```

::: warning Learn more
These subsections will only cover the most essential parts of defining a Flow to keep the Quickstart simple. However, there are many advanced configurations that you have at your disposal when defining a Flow, so make sure to check out the [Flow Overview](/core-concepts/flows/flows-overview) in Core Concepts.
:::

### ConfigureAsync

The first method that you need to implement for the `IFlow` interface is the `ConfigureAsync` method.

The `ConfigureAsync` method enables you to set crucial metadata for your Flow that is then synchronized to the metadata database by Didact Engine when it consumes a Flow Library.

#### Dependency injection

First, you need a special dependency from Didact Core, so inject the `IFlowConfigurator` interface into SomeFlow's constructor and save it to a field, as shown below:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }
}
```

#### Fluent API

After injecting the required dependency, you now need to define the `ConfigureAsync` method and set SomeFlow's metadata. The `IFlowConfigurator` interface provides some convenient metadata builder methods to call in a sleek, easy-to-use fluent API.

The metadata fluent API has many different methods that you can call, but for this Quickstart, I will only show the essential ones below:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public async Task<IFlowConfigurator> ConfigureAsync()
    {
        await Task.CompletedTask;
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }
}
```

<!-- ::: warning Method signature
Notice that you return the `IFlowConfigurator` object.
::: -->

::: warning Type names
It is **extremely important** that you call `GetType().Name` in the `WithTypeName` method. This is an essential piece of metadata that Didact Engine uses to instantiate and execute your Flows later on, and it must *always* match the Flow's class name.
:::

#### Async signature

You may notice that `ConfigureAsync` is an asynchronous method that wraps `IFlowConfigurator` in a `Task`, but many - if not all - of your metadata values will likely be static, hard-coded, or synchronous values.

That's ok, just add `await Task.CompletedTask` above the `return` statement to satisfy the method signature.

::: tip Why async?
I intentionally made this method asynchronous by default to satisfy advanced future configurations that users may be interested in doing; I don't want to deal with a painful async refactoring later on which would pose a major breaking change to the API. Often times, it's not recommended to make a method default asynchronous if it's only going to run synchronously, but in this case - and because I wrote how `ConfigureAsync` is used - I am telling you not to worry about it.
:::

### ExecuteAsync

The second method that you need to implement for `IFlow` is the `ExecuteAsync` method.

This method is the heart of the Flow where you define the actual work to be done. Since it's just an ordinary method, it can do anything that you want it to, so make sure to check out the [Flow Overview](/core-concepts/flows/flows-overview) in Core Concepts to learn more.

For the moment, let's define something simple:

1. First, inject the `IFlowLogger` dependency from Didact Core into the class constructor and save it to a new field:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;
    private readonly IFlowLogger _logger;

    public SomeFlow(IFlowConfigurator flowConfigurator, IFlowLogger logger)
    {
        _flowConfigurator = flowConfigurator;
        _logger = logger;
    }
}
```

2. Then, add the following statements to `ExecuteAsync` to simulate an execution:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;
    private readonly IFlowLogger _logger;

    public SomeFlow(IFlowConfigurator flowConfigurator, IFlowLogger logger)
    {
        _flowConfigurator = flowConfigurator;
        _logger = logger;
    }

    public async Task<IFlowConfigurator> ConfigureAsync()
    {
        await Task.CompletedTask;
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }

    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        _logger.LogInformation("Starting execution...");
        await Task.Delay(5000);
        _logger.LogInformation("Execution complete.");
    }
}
```

For the moment, let's not worry about the `IFlowExecutionContext` argument - we will come back to this in the Core Concepts and Guides.

Congratulations, you now have a fully-prepared Flow!