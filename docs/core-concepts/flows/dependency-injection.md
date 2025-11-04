---
title: Dependency Injection
description:
---

# Dependency Injection

Once you [setup dependency injection](/core-concepts/flow-libraries/dependency-injection) for your flow library, you can use it in your flows.

## Flow constructor

To use dependencies inside of your flow definitions, all you need to do is inject them into the flow constructor as is normal procedure. Typically, I inject my dependencies and set them as `private readonly` fields.

For example, if I want to use `IServiceA` in my flow, I would do the following:

```csharp
using DidactCore.Flows

namespace FlowLibrary
{
    public class MyFlow : IFlow
    {
        private readonly IServiceA _serviceA;

        public MyFlow(IServiceA serviceA)
        {
            _serviceA = serviceA;
        }

        // ...

        public async Task ExecuteAsync(IFlowExecutionContext context)
        {
            await _serviceA.DoSomething();
        }
    }
}
```

## Flow registration

Just as a quick reminder, [you do **not** have to register the flows themselves](/core-concepts/flow-libraries/dependency-injection#don-t-register-flows) for dependency injection; you only need to register the flows' dependencies.