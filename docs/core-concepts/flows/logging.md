# Logging

In a Flow's `ExecuteAsync` method, you can access an auto-injected logger from the `IFlowExecutionContext` parameter that is passed in. The logger implements the standardized `ILogger` interface.

```csharp
public class SomeFlow : IFlow
{
    public async Task ExecuteAsync(IFlowExecutionContext context)
    {
        var logger = context.Logger;
        logger.LogInformation("Using the context logger...");
    }
}
```

FlowRun logs are stored in Didact's database for easy and centralized historical analysis of a flow's lifecycle.