---
title: Flows
description: Flows are the core building blocks for your Didact jobs. Flows are created by implementing the IFlow interface and defining the Configure and ExecuteAsync methods.
---

# Flows Overview

Flows are the core building blocks for creating your jobs, whether it be background jobs, scheduled jobs, event-driven jobs, and so on.

They contain the definitions of your jobs, which are comprised of mainly two parts:

1. The Flow's metadata configurations.
2. The actual code to execute within the Flow.

## Flow Library

As a quick reminder, you define your Flows in a Flow Library, *not* in Didact Engine. The Flow Library contains all of your Flow definitions and their dependencies.

## IFlow Interface

Unlike other background job libraries, such as Hangfire, Flows are *not* defined as anonymous methods. Instead, Flows are *classes* which implement the special `IFlow` interface from the `DidactCore.Flows` namespace.

For example, see the code snippet below for a class called `ExampleFlow`:

```cs
using DidactCore;

public class ExampleFlow : IFlow
{
    private readonly IFlowConfigurator _flowConfigurator;

    public ExampleFlow(IFlowConfigurator flowConfigurator)
    {
        _flowConfigurator = flowConfigurator;
    }

    public IFlowConfigurator Configure() {}

    public async Task ExecuteAsync(IFlowExecutionContext context) {}
}
```

The `IFlow` interface requires you to implement a few special methods, namely, `Configure` and `ExecuteAsync`.

::: tip Dependency injection
Notice that we are using constructor-based dependency injection where we save the injected dependencies to `private readonly` fields in the class. As you likely know, this is standard practice in modern dotnet projects now.
:::

### Configure

The `Configure` method is where you define the metadata for your Flow, such as the name(s), versioning, scheduling, and so on.

::: warning Dependency injection
Notice that the method returns an `IFlowConfigurator` object, so it is essential that you inject this object into your Flow's constructor and save it to a field as I have done in the code snippet above. Each `IFlowConfigurator` instance is transient, meaning it is isolated per Flow and per instance.
:::

This method is used in Didact Engine when it integrates your Flow Library and synchronizes its metadata to the Didact database. In simple terms, Didact Engine:

* Identifies and loads your Flow Library.
* Uses advanced reflection to instantiate each class from your Flow Library that implements the `IFlow` interface.
* Runs the `Configure` method for each instantiated Flow.

So this method is only run by Didact Engine **during the integration process**, *not* each time that the Flow executes.

### ExecuteAsync

The `ExecuteAsync` is "where the magic happens": *this method* is where the heart of your actual job is defined.

I heavily debated how to handle and architect `ExecuteAsync`. Some job orchestrators are more strict and heavily opinionated in how you define jobs; for example, the Python orchestrator Apache Airflow requires you to create directed acyclic graphs, or DAGs for short. While these are powerful constructs, they are heavily opinionated and somewhat limiting in nature.

Instead of following something more constraining like a DAG, I decided to simply make the `ExecuteAsync` method as something you implement via the `IFlow` interface. *What* your implementation does is, as you can see, entirely up to you because, at the end of the day, *it's just a method*.

So write `ExecuteAsync` to do whatever you want. Make it a simple database call, or implement your own version of a DAG, or make it fifty lines long that all call various microservices. The beauty of it is that you write the method to make it do *whatever you want*.

All you ultimately need to worry about is fulfilling the method signature.

#### Behaviors

Please note three very important behaviors of `ExecuteAsync`:

1. The method signature is asynchronous, so if you have synchronous-only code, add `await Task.CompletedTask` to the end of your code block.
2. The method contains one argument which is automatically-injected by Didact Engine: the `IFlowExecutionContext` object. This object contains important metadata about both your `Flow` itself as well as the specific `FlowRun` being executed. Using this object is completely optional, but it's there for your convenience. 
3. The method **does not return anything** other than a `Task`. Remember, your Flows are instantiated and executed in an automated fashion, in the background, by Didact Engine.