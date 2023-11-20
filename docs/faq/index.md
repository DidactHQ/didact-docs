---
title: FAQ
---

# FAQ

On this page, you will find a common list of frequently asked questions pertaining to Didact.

## Why is ConfigureAwait(false) used in all of the asynchronous method calls?

Both your `Flow Library` as well as the Didact nuget packages are .NET class library projects. In .NET libraries, asynchronous code often is not required to execute within the same `Synchronization Context` as its calling code, such as in a UI application. As a result, I have added `ConfigureAwait(false)` to many of my code samples.

In short, `ConfigureAwait(false)` tells .NET that it can run the specified asynchronous method *anywhere*, meaning it does not have to worry about handling `Synchronization Context` with the caller. This permits a performance improvement within the code.

Although the performance improvement is often miniscule, I want Didact to operate as fast as it possibly can, so why not take advantage of small performance improvements where I can?

If you're still confused about `ConfigureAwait` or would like to read up on it more, I encourage you to checkout the following resources below:
- [Best practice to call ConfigureAwait for all server-side code](https://stackoverflow.com/questions/13489065/best-practice-to-call-configureawait-for-all-server-side-code)
- [Usage of ConfigureAwait in .NET](https://stackoverflow.com/questions/62681749/usage-of-configureawait-in-net)