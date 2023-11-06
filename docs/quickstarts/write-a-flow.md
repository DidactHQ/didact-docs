---
title: Write a Flow
---

# Write a Flow

Now comes the main part of Didact: constructing your first `Flow`. A `Flow` is a class that represents your background job/data pipeline/workflow. It implements the `IFlow` interface from the `Didact Core` nuget package.

## Create a Flow

1. In your class library project, create a new class file. For this example, we will create a new class named `SomeFlow`.
2. At the top of your class, add a reference to the `DidactCore` namespace and implement the `IFlow` interface onto your class.

```cs
using DidactCore;

public class SomeFlow : IFlow
{

}
```

## Flow constructor

Your new `Flow`

Something

## Create a Block

`Blocks` are another essential part of `Flows`. The short and easy version is that they are execution wrappers for your methods. Technically, they wrap around a `delegate`, so your execution code could be a method, lambda expression, an `Action`, or something else. They are strongly typed and offer logging, time tracking, and some other nice characteristics.

Ideally, you want to wrap each piece of your execution logic inside a separate `Block` and chain them together in your Flow's `ExecuteAsync` method.

::: tip The long
To learn more of the low level details about how `Blocks` work, you can read about them on the Blocks core concepts page.
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

::: warning Depedency Injection in a class library?
You might be wondering how we "inject" `IServiceProvider` into `SomeFlow` when `SomeFlow` exists in a class library project. But remember: Didact Engine will grab the library's `.dll` files and execute your `Flow` within the context of *its own* dependency system.
:::

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

3. Then, in your Flow's `ExecuteAsync` method that is implemented from the `IFlow` interface, instantiate a new `Block` with the injected `IServiceProvider` as well as the static `ActivatorUtilities.CreateInstance<>` method from the `Microsoft.Extensions.DependencyInjection` package.

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