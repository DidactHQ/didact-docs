---
title: Multiple Repos
description: A description of the Didact open source platform. Specifically, a deep dive into its multi-repo setup in GitHub.
---

# Multiple Repos

Perhaps "going against the grain" a little, the core components of Didact's architecture are organized into multiple, separate repositories rather than a central monorepo.

Specifically, you will find a separate, isolated repository for each core component of Didact's architecture:

- [didact-engine](https://github.com/DidactHQ/didact-engine)
- [didact-ui](https://github.com/DidactHQ/didact-ui)
- [didact-core](https://github.com/DidactHQ/didact-core)
- [didact-sentinel](https://github.com/DidactHQ/didact-sentinel)

## Reasoning

I was greatly torn about whether or not to take a monorepo or polyrepo approach when open sourcing Didact. When I observed other open source job orchestrators on GitHub, it appeared that many of them utilized a monorepo approach for the central application.

Rather than blindly following suit simply because others have done so, I instead decided to conduct research on whether or not one method might be more preferable than the other. Based off of the results I found, it really came down to the decision being a **matter of preference**: if you like monorepos, then use them - and if you don't, then don't.

And that's essentially why polyrepos are used here: because that's my preference.

The debate of a monorepo vs. a polyrepo approach is outside the scope of this documentation. Suffice it to say, a polyrepo approach with git submodules seemed easier to manage *per my preference.*

I greatly appreciate the simplicity of cloning an individual repository 