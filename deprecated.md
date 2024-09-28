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