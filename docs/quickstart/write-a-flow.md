---
title: Write A Flow
description:
---

# Write a Flow

Now that you have your Flow Library, it's time to create your first `Flow`. Flows are Didact's terminology for a background job. In this guide, we will create a simple flow called  `SomeFlow`.

::: warning Learn more
The Quicktart covers only the most essential parts of defining a Flow to keep things simple. However, there are many advanced configurations that you have at your disposal when defining a Flow, so make sure to check out the [Flow Overview](/core-concepts/flows/flows-overview) and related pages in Core Concepts.
:::

## Create new class

First, create a new C# class called `SomeFlow`.

## Implement IFlow interface

Next, add a reference to the `DidactCore.Flows` namespace and implement the `IFlow` interface onto your class.

```cs
using DidactCore.Flows;

public class SomeFlow : IFlow
```

The `IFlow` interface requires you to implement two methods:
- `ConfigureAsync`
- `ExecuteAsync`

### ConfigureAsync

First, you need to implement `ConfigureAsync`. This method takes an `IFlowConfigurationContext` object that exposes:
- Various Didact metadata context objects.
- An `IFlowConfigurator`.

#### Context

The top-level `IFlowConfiguratorContext` object exposes several other context objects that contain various metadata about Didact and the deployment that your flow is coming from (more on that later). This metadata context is **read-only** and is injected for your convenience if you need it.

#### Configurator

The main thing to pay attention to here is the `IFlowConfigurationContext.IFlowConfigurator` object. This configurator is **extremely important** and is what you must use to configure the metadata and behavior of your flow.

Most of the code you will write in `ConfigureAsync` is setting metadata against the `IFlowConfigurator` object. The configurator exposes a collection of fluent API methods such as `.WithName()` that you use to configure flow metadata and behavior.

#### Signature

Notice also that the method signature returns `Task<IFlowConfigurationContext>`. The idea is you take the injected context, manipulate the configurator, and return the context back.

::: tip
If your configurations do not require any actually-asynchronous code using `await`, then just return the context with `Task.FromResult` and omit the `async` keyword on the method signature. If you're wondering why `ConfigureAsync` returns a `Task<>` when your metadata is probably hard-coded, then check out [Async signature](/core-concepts/flows/flows-overview#async-signature). Short answer: it allows for really cool, complex configurations later on.
:::

#### WithName()

Of the various fluent API methods offered by the `IFlowConfigurator`, the most important one is the `.WithName()` method. Each flow is **uniquely-identified per [Didact environment](/core-concepts/environments)** by the string that you pass into `WithName()`, so be mindful of what names you use.

A few recommendation for choosing a flow name:

- Make the name simple.
- Use a slugified name. For example, instead of `SomeFlow`, pass in `some-flow`.
- Flow names are not unique per class library, they are unique per [Didact environment](/core-concepts/environments), so use common sense and **don't repeat names across flow libraries**.

Let's implement `ConfigureAsync` and use the flow name `some-flow` on the configurator as shown below:

```cs
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

### ExecuteAsync

Next, implement the `ExecuteAsync` method. This method is the heart of the Flow where you define the actual work to be done. Since it's just an ordinary method, it can do anything that you want it to.

`ExecuteAsync` is invoked when a flowrun is executed.

#### Signature

Unlike `ConfigureAsync` above, `ExecuteAsync` returns only a `Task` since flowruns are executed asynchronously and in the background processes of Didact Engine.

#### Context

Similar to `ConfigureAsync` above, `ExecuteAsync` also takes an injected context, this context of the type `IFlowExecutionContext`. This context object exposes many useful utilities that you may need in your flow, such as a database flowrun logger, a flowrun cancellation token, and more.

Let's use the database flowrun logger from the injected context and simulate work being done:

```cs
public class SomeFlow : IFlow
{
    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        var logger = context.Logger;
        logger.LogInformation("Simulating work...");
        await Task.Delay(5000);
        logger.LogInformation("Work complete.");
    }
}
```

## Full sample code

Now let's put it all together in a fully-formed flow:

```cs
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