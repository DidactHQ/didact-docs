---
title: Dependency Injection
description:
---

# Dependency Injection

No doubt, many users will need to utilize dependency injection when writing their flows. Dependency injection is one of the most powerful features of modern dotnet apps, so that's completely understandable!

Since flow libraries function as runtime plugins (see the [Flow Library architecture page](/core-concepts/architecture/flow-library)), we have to use a very specific method of enabling dependency injection in your flows. We do this by setting up some custom classes in your flow library.

## Setup the registrar

To setup dependency injection for your flow library, you need to implement a special interface called `IPluginRegistrar`. This interface exposes a method called `RegisterServices` where you can register dependencies that your flows need.

`RegisterServices` takes a method-injected `IServiceCollection` that you can invoke normal dependency injection registrations against, such as `.AddSingleton`, `.AddScoped`, and `.AddTransient`. This method then returns the `IServiceCollection` that will be ingested and configured within Didact Engine.

Here is a basic implementation below inside of a flow library called `FlowLibrary`:

```csharp
using DidactCore.Plugins

namespace FlowLibrary
{
    public class PluginRegistrar : IPluginRegistrar
    {
        IServiceCollection RegisterServices(IServiceCollection pluginServiceCollection) {}
    }
}
```

## Register dependencies

After you create your implementation of `IPluginRegistrar`, now you need to register each service that you want used as a dependency in your flow library.

::: warning
When you register your services, make sure to **actually return** the `pluginServiceCollection` at the end of the method!
:::

```csharp
using DidactCore.Plugins

namespace FlowLibrary
{
    public class PluginRegistrar : IPluginRegistrar
    {
        IServiceCollection RegisterServices(IServiceCollection pluginServiceCollection)
        {
            pluginServiceCollection.AddSingleton<IServiceA>();
            pluginServiceCollection.AddScoped<IServiceB>();
            pluginServiceCollection.AddTransient<IServiceC>();
            // ...
            return pluginServiceCollection;
        }
    }
}
```

## Don't register flows

This may come as a surprise to you, but you do not have to register flows in the dependency injection registrar; the only thing you need to register are any flow dependencies, **not the flows themselves**.

## Inject dependencies

Now that your registrar is setup, you can write your flows using the registered dependencies. As is standard procedure with normal dotnet dependency injection, if you want to use a dependency in a flow, you simply inject it into the flow's constructor like you would any other C# class. Most of the time, I inject dependencies into class constructors and then save those dependencies to `private readonly` fields in the class.

Didact will take of the internal mechanics to make that happen under the hood.

## Rationale

::: info
This section explains the founder's rationale behind the content described above. It is not required to use Didact, but it may enhance your understanding.
:::

### Runtime friendly

As stated on the [Flow Library architecture page](/core-concepts/architecture/flow-library), flow libaries function as runtime plugins within Didact Engine. That means that any sort of functional dependency injection system that I give these flow libraries must also function in a runtime-plugin-compatible manner.

This is **extremely complicated**.

Essentially, every plugin gets its own `IServiceCollection` that builds into an `IServiceProvider` constrained only to that specific plugin. The `IServiceProvider` primarily has services registered from the flow library's registrar, though there are a few additional services exposed in this `IServiceProvider` from Didact Engine.

### Isolation

Each flow library is isolated from all other flow libraries when they are loaded as runtime plugins into Didact Engine. This is possible because I wired up a custom, collectible (meaning unloadable) `AssemblyLoadContext` class within Didact Engine that fully isolates all assemblies within one flow library from other flow libraries.

Each flow library gets a 1:1 correspondence with an encapsulating `AssemblyLoadContext` that loads and isolates it within the `AppDomain`.

::: info `AppDomain`?
In the old .NET Framework days, something like this could be accomplished by using multiple `AppDomains` within a C# app. However, starting with .NET Core and having been continued into modern .NET versions, now a C# app only ships with one, default `AppDomain`. So any sort of runtime plugin behavior must now use a new tool that the .NET architects have provided called `AssemblyLoadContext`.
:::

### Service lifetimes

Given that each flow library functions as a runtime plugin, it might be important for you to consider what this means for the dependency injection service lifetimes, namely, `Singleton`, `Scoped`, and `Transient`.

Since flow libraries are loaded into an already-started-up Didact Engine, the `Singleton` lifetime, in this case, would equal the duration in which the flow library is loaded as an active plugin within Didact Engine. Once the plugin is unloaded, the flow library's `Singleton` lifetime would end.

For the `Scoped` lifetime, every time a new flow run is instantiated and executed, a corresponding `Scoped` lifetime is created with it. So every new flow run gets its own `Scoped` lifetime.

For the `Transient` lifetime, this means what is usually means: each instantiation is a new object. In the context of Didact's flow run, `Transient` is pretty much identical to `Scoped` since each flow run is isolated.