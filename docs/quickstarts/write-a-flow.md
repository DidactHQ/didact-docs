---
title: Write a Flow
description: Flows are very easy to get started with. We create a new class, implement the IFlow interface, and define the Configure and ExecuteAsync methods. The ExecuteAsync method is the heart of our job.
---

# Write a Flow

Now comes the main part of Didact: constructing your first `Flow`. A `Flow` is a class that represents your job. It implements the `IFlow` interface from the `DidactCore` nuget package.

## Create the Class

1. In your class library project, create a new class file. For this example, we will create a new class named `SomeFlow`.
2. At the top of your class, add a reference to the `DidactCore.Flows` namespace and implement the `IFlow` interface onto your class.

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    public SomeFlow() { }
}
```

## Configure

Before we define *what* the Flow will do, we first need to define some top-level configurations and metadata for the Flow. These configurations will be saved to persistent storage when your class library plugin is loaded into Didact Engine, but to do that, we must implement the `Configure` method from the `IFlow` interface.

This method requires the `IFlowConfigurator` interface to set and save the metadata. However, rather than instantiating this construct, we instead inject it into `SomeFlow`'s class constructor and save it as a field. Once the configurations are made, we return the `IFlowConfigurator`.

::: warning Look familiar?
If you think this looks like **dependency injection**, then you would be absolutely correct. It might sound silly to talk about dependency injection in a class library project since class libraries are not executables and do not have hosts, but we are essentially setting up the `Flow` for dependency injection *when it is loaded into Didact Engine*. More on that later.
:::

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure() { }
}
```

The `IFlowConfigurator` has several different configurations that you can set for robust customization, and they are available as a nice, easy-to-read fluent API. Let's add a few configurations.

### Naming

First off, we need to assign at least one **extremely important name** to `SomeFlow`: its `TypeName`. This value will be directly referenced from persistent storage when Didact Engine's dependency injection and plugin system dynamically instantiates `SomeFlow` for execution, so we **must** ensure that we set it to the correct value.

For the `TypeName` value, we **always** want to use the following method call:

```cs
.WithTypeName(GetType().Name)
```

::: warning Why always?
The reason I stress the word *always* when using `.WithTypeName(GetType().Name)` is because when this value is fetched from persistent storage by Didact Engine's dependency injection and plugin system, the value will be passed to `System.Reflection`. It would break the plugin system to use the wrong value for reflection.
:::

Since the `IFlowConfigurator` uses a fluent API syntax, just chain it to `_flowConfigurator`:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name);
    }
}
```

You are also welcome to optionally add the `.WithName` and `.WithDescription` methods. Neither are required by Didact Engine, but sometimes it might be helpful to add some extra descriptors and nicknames to certain flows (`TypeNames` don't always roll off the tongue).

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.");
    }
}
```

### Version

Versioning is also an important concept for `Flows`. This is discussed in greater detail later as Didact's versioning is intertwined with both the `Flows` and `Flow Library`, but for now just know that there is an `.AsVersion` method provided for you to use here.

I **strongly recommend** getting in the habit of using `.AsVersion` and assigning versions to your Flows.

::: warning Is this really necessary?
It might seem both tedious and redundant to add a version to the `Flow` itself since:
1. You would ideally already have setup version control for your `Flow Library`.
2. A class library has an associated `AssemblyVersion` in the project settings.

As mentioned above, the "why?" for this is discussed later in Core Concepts and is too complex for the scope of this document.
:::

The `.AsVersion` method accepts a string, so you are free to name your versions whatever you want. However, I like to follow the [semantic versioning guidelines](https://semver.org/) for consistency.

Per the fluent API, add `.AsVersion` as another chain call:

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0");
    }
}
```

### Queue

This is a deep topic to dive into, but at a high level, the execution system for Didact is powered by SQL-based queue tables. There are different types of queues, and you can create any number of queues for each queue type. Consequently, you need to specify in your Flow which queue type and queue you want the `Flow` to execute against.

Several different queue types are offered in the Didact Platform, but the default queue type - the one optimized for **maximum execution throughput** and **non-guaranteed, best-effort ordering** - is called a `Hyper Queue`.

::: tip Didact constants
For your convenience, the `DidactCore.Constants` namespace has static constant classes to make helper references like queue types easier to use. As such, you will see the `QueueTypes` static class referenced below.
:::

To specify the intended queue and queue type, add the `DidactCore.Constants` namespace and `.ForQueue` method call below:

```cs
using DidactCore.Flows;
using DidactCore.Constants;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }
}
```

### Full Configuration

The full example of configurations is below:

```cs
using DidactCore.Flows;
using DidactCore.Constants;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }
}
```

## Dependency Injection

If `SomeFlow` requires the usage of any dependencies, then you can inject them into `SomeFlow's` class constructor and save them as fields.

For example, let's say you need access to two dependencies, `IDependencyA` and `IDependencyB`. To add them to `SomeFlow` for use, you would add the following code below:

```cs
using DidactCore.Flows;
using DidactCore.Constants;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;
    private readonly IDependencyA _dependencyA;
    private readonly IDependencyB _dependencyB;

    public SomeFlow(IFlowConfigurator flowConfigurator, IDependencyA dependencyA, IDependencyB dependencyB)
    {
        _flowConfigurator = flowConfigurator;
        _dependencyA = dependencyA;
        _dependencyB = dependencyB;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }
}
```

## ExecuteAsync

Now that we have the metadata configurations in place, we get to the fun part: actually defining *what* the `Flow` is supposed to do. This takes place in the `Flow's` `ExecuteAsync` method.

The `ExecuteAsync` method can do whatever you want it to do: write a log, interact with a database, file IO, API calls, whatever you want. This is the heart of your job.

```cs
using DidactCore.Flows;
using DidactCore.Constants;

public class SomeFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;
    private readonly IDependencyA _dependencyA;
    private readonly IDependencyB _dependencyB;

    public SomeFlow(IFlowConfigurator flowConfigurator, IDependencyA dependencyA, IDependencyB dependencyB)
    {
        _flowConfigurator = flowConfigurator;
        _dependencyA = dependencyA;
        _dependencyB = dependencyB;
    }

    public IFlowConfigurator Configure()
    {
        return _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default");
    }

    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        _dependencyA.DoSomething();
        await _dependencyB.DoSomethingAsync();
    }
}
```

### Synchronous Only

In case the code that you define in `ExecuteAsync` is synchronous only, add the following snippet to the end of your code to match the method signature:

```cs
await Task.CompletedTask;
```