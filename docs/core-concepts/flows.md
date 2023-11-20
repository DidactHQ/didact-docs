---
title: Flows
---

# Flows

## ExecuteAsyc

::: tip
If your code within `ExecuteAsync` is synchronous only, then finish the method with `await Task.CompletedTask` to make it async friendly, as below:

```cs{8}
public class SomeFlow : IFlow
{
    // Other code

    public async Task ExecuteAsync()
    {
        // Other code
        await Task.CompletedTask;
    }
}
```
:::