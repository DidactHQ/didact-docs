---
title: Write a Flow
---

# Write a Flow

Now comes the main part of Didact: constructing your first `Flow`. A `Flow` is a class that represents your job. It implements the `IFlow` interface from the `DidactCore` nuget package.

## Create the Class

1. In your class library project, create a new class file. For this example, we will create a new class named `SomeFlow`.
2. At the top of your class, add a reference to the `DidactCore.Flows` namespace and implement the `IFlow` interface onto your class.

```cs{1,3}
using DidactCore.Flows;

public class SomeFlow : IFlow
{
    public SomeFlow() { }
}
```

## ConfigureAsync

Before we define *what* the Flow will do, we first need to define some top-level configurations and metadata for the Flow. These configurations will be saved to persistent storage when your class library plugin is loaded into Didact Engine, but to do that, we must implement the `ConfigureAsync` method from the `IFlow` interface.

This method requires the `IFlowConfigurator` interface to set and save the metadata. However, rather than instantiating this construct, we instead inject it into `SomeFlow`'s class constructor and save it as a field.

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

    public async Task ConfigureAsync() { }
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

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
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

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
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

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
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

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default")
    }
}
```

### SaveConfigurationsAsync

Finally, add the `.SaveConfigurationsAsync()` at the end of your method chain.

::: danger
If you forget to add `.SaveConfigurationsAsync`, none of your metadata will be saved to persistent storage - so don't forget!
:::

```cs
await _flowConfigurator
    .WithTypeName(GetType().Name)
    // ...
    .SaveConfigurationsAsync();
```

### Full Configurations Example

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

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default")
            .SaveConfigurationsAsync();
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

    public SomeFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public async Task ConfigureAsync()
    {
        await _flowConfigurator
            .WithTypeName(GetType().Name)
            .WithName("SomeFlow Custom Name")
            .WithDescription("A flow description.")
            .AsVersion("v1.0.0")
            .ForQueue(QueueTypes.HyperQueue, "Default")
            .SaveConfigurationsAsync();
    }

    public async Task ExecuteAsync()
    {
        var sum = 1 + 1;
    }
}
```

### Synchronous-Only Code

In case the code that you define in `ExecuteAsync` is synchronous-only, add the following snippet to the end of your code to match the method signature:

```cs
await Task.CompletedTask;
```

## Constructor Injection

Now `SomeFlow` exists as a class in the `Flow Library` project, but we need to take a moment and discuss its constructor.

Flows are *not* meant to be manually instantiated. Whether they are triggered on a schedule, an API call, via Didact UI, or some other way, Didact Engine is meant to launch and execute your Flows internally *without explicit instantiation from you*.

::: warning Say goodbye to new
In other words, you are not meant to instantiate the class with the `new` keyword.
:::

Moreover, one of the greatest advantages of Didact is allowing you to utilize the full .NET dependency injection system in your Flows. Since your Flows are executed within Didact Engine, Didact Engine's dependency injection system is what intertwines with them.

::: warning Dependency Injection in a class library?
I would encourage you to read about Didact Engine, the dependency injection system, and extension methods in the Core Concepts section to fully understand how dependency injection is wired up to your Flows.
:::

Per the usual method of modern dependency injection in C#, dependencies are injected into a class via its constructor (termed **constructor injection**) and stored in `private readonly` fields.

We will inject a generic `ILogger` into `SomeFlow` via its constructor and store it in a field, as indicated below:

```cs{5,7,9}
using DidactCore;

public class SomeFlow : IFlow
{
    private readonly ILogger _logger;

    public SomeFlow(ILogger logger)
    {
        _logger = logger;
    }
}
```

## Create Blocks

`Blocks` are another essential part of `Flows`. The short and easy version is that they are execution wrappers for your methods. Technically, they wrap around a `delegate`, so your execution code could be a method, lambda expression, an `Action`, or something else. They are strongly typed and offer logging, time tracking, and some other nice characteristics.

Ideally, you want to wrap each piece of your execution logic inside a separate `Block` and chain them together in your Flow's `ExecuteAsync` method.

::: tip The long
To learn more of the low level details about how `Blocks` work, you can read about them in the core concepts.
:::

1. To use a `Block` in your `Flow`, you first need to inject `IServiceProvider` into the `Flow's` constructor and add a new field:

```cs{6,8,11}
using DidactCore;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }
}
```

2. Next, add the `Microsoft.Extensions.DependencyInjection` package to the `Flow Library`. Then add its namespace to the top of your class, like so:

```cs{2}
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }
}
```

3. Then, in your Flow's `ExecuteAsync` method that is implemented from the `IFlow` interface, instantiate a new `Block` called `actionBlock` with the injected `IServiceProvider` as well as the static `ActivatorUtilities.CreateInstance<>` method from the `Microsoft.Extensions.DependencyInjection` package.

```cs{17}
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public async Task ExecuteAsync()
    {
        var actionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
    }
}
```

4. Next, add the delegate, or `executor`, to `actionBlock` along with a few configurations. Since the `executor` is a delegate, we will use a simple lambda function. This is all available via an easy-to-use fluent API syntax:

```cs{19-24}
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public async Task ExecuteAsync()
    {
        var actionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
        actionBlock
            .WithName("Action Block 1")
            .WithSoftTimeout(5000)
            .WithExecutor(() =>
                {
                    _logger.LogInformation("This is a test log event from a block.")
                });
    }
}
```

5. Let's create another ActionBlock called `anotherActionBlock` and add an `executor` and a few configurations to it. For simplicity, we will use another lambda function for the `executor`:

```cs{26-33}
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public async Task ExecuteAsync()
    {
        var actionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
        actionBlock
            .WithName("Action Block 1")
            .WithSoftTimeout(5000)
            .WithExecutor(() =>
                {
                    _logger.LogInformation("This is a test log event from the first Action Block.")
                });

        var anotherActionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
        actionBlock
            .WithName("Action Block 2")
            .WithSoftTimeout(5000)
            .WithExecutor(() =>
                {
                    _logger.LogInformation("This is a test log event from the second Action Block.")
                });
    }
}
```

6. Configuring our blocks is not enough: we need to **actually execute them**. We do so by calling their `ExecuteAsync` method inside of the Flow's `ExecuteAsync` method. Since the blocks are merely objects, we can run them however we like. If they are dependent upon each other, then we need to run them sequentially. Conversely, if they are not dependent upon each other, then we can run them in parallel. For the sake of this example, we will run the blocks sequentially and assume they have a necessary ordering:

```cs{35-36}
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(ILogger logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public async Task ExecuteAsync()
    {
        var actionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
        actionBlock
            .WithName("Action Block 1")
            .WithSoftTimeout(5000)
            .WithExecutor(() =>
                {
                    _logger.LogInformation("This is a test log event from the first Action Block.")
                });

        var anotherActionBlock = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
        actionBlock
            .WithName("Action Block 2")
            .WithSoftTimeout(5000)
            .WithExecutor(() =>
                {
                    _logger.LogInformation("This is a test log event from the second Action Block.")
                });

        await actionBlock.ExecuteAsync().ConfigureAwait(false);
        await anotherActionBlock.ExecuteAsync().ConfigureAwait(false);
    }
}
```