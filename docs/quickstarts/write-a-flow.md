---
title: Write a Flow
---

# Write a Flow

Now comes the main part of Didact: constructing your first `Flow`. A `Flow` is a class that represents your background job/data pipeline/workflow. It implements the `IFlow` interface from the `Didact Core` nuget package.

## Create a class

1. In your class library project, create a new class file. For this example, we will create a new class named `SomeFlow`.
2. At the top of your class, add a reference to the `DidactCore` namespace and implement the `IFlow` interface onto your class.

```cs
using DidactCore;

public class SomeFlow : IFlow
{

}
```

## Class constructor

Something

## Create a block

`Blocks` are another essential part of `Flows`. `Blocks` are specialized wrappers for delegates that act as atomic building blocks for a `Flow`. Ideally, each atomic action within a `Flow` should be wrapped by and execute inside of a `Block` of some sort.

The delegate input is the central part of the `Block` and can be a multitude of various constructs, such as:

* A method defined somewhere in your class library or its dependencies.
* A `delegate`.
* An `Action`.
* A `Func`.
* A lambda expression.

`Blocks` track start and end execution times, emit internal logging events, encapsulate their own retry logic and timeout logic, and more.

1. To use a `Block` in your `Flow`, you first need to add `IServiceProvider` in the `Flow's` constructor. Returning to `SomeFlow`, modify its class constructor as below:

```cs
using DidactCore;

public class SomeFlow: IFlow
{
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
}
```

2. Next, add the `Microsoft.Extensions.DependencyInjection` package to the `Flow Library`. Then add its namespace to the top of your class, like so:

```cs
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
}
```

3. Then, in your Flow's `ExecuteAsync` method that is implemented from the `IFlow` interface, instantiate a new `Block` with the injected `IServiceProvider` as well as the static `ActivatorUtilities.CreateInstance<>` method from the `Microsoft.Extensions.DependencyInjection` package.

```cs
using DidactCore;
using Microsoft.Extensions.DependencyInjection;

public class SomeFlow: IFlow
{
    private readonly IServiceProvider _serviceProvider;

    public SomeFlow(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task ExecuteAsync()
    {
        var block = ActivatorUtilities.CreateInstance<ActionBlock>(_serviceProvider);
    }
}
```