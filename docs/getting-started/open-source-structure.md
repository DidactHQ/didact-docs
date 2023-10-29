---
title: Open Source Structure
description: A description of the Didact open source platform. Specifically, a deep dive into its multi-repo setup in GitHub.
---

# Open Source Structure

This page details the structure of Didact's open source code and how it is intended to be managed.

## Polyrepos

Perhaps "going against the grain" a little, the core components of Didact's architecture are organized into multiple, separate repositories rather than a central monorepo.

Specifically, you will find a separate, isolated repository for each core component of Didact's architecture:

- [didact-engine](https://github.com/DidactHQ/didact-engine)
- [didact-ui](https://github.com/DidactHQ/didact-ui)
- [didact-core](https://github.com/DidactHQ/didact-core)
- [didact-sentinel](https://github.com/DidactHQ/didact-sentinel)

### A Matter of Preference

I was greatly torn about whether or not to take a monorepo or polyrepo approach when open sourcing Didact. When I observed other open source job orchestrators on GitHub, it appeared that many of them utilized a monorepo approach for the central application.

Rather than blindly following suit simply because others have done so, I instead decided to conduct research on whether or not one method might be more preferable than the other. Based off of the results I found, it really came down to the decision being a **matter of preference**: if you like monorepos, then use them - and if you don't, then don't.

And that's essentially why polyrepos are used here: because that's my preference.

::: info No need to die on that hill
If the polyrepo approach becomes unmanagable long-term, or if the majority of the community expresses a strong dislike of this approach, then I'm not opposed to switching to a monorepo approach. Since I will already have the release repo, [Didact](https://github.com/DidactHQ/didact), provisioned, I should be able to make the switchover to a monorepo easily.
:::

## Git Submodules

Because each piece of the Didact architecture is sourced in a separate repo, the pieces will need to be reaggregated back up into the primary release repo, [Didact](https://github.com/DidactHQ/didact), to release a full platform version.

To accomplish this, I plan to utilize [git submodules](https://www.atlassian.com/git/tutorials/git-submodule) and use the release repo as just that: a central place for managing individual releases of each component and aggregating them up to a platform version.

## Release Repo

As stated above, each piece of Didact's architecture will be reaggregated back up to the primary release repo, [Didact](https://github.com/DidactHQ/didact).

The release repo will be where I run integration tests and Docker builds (several individuals have already asked about Didact being Docker friendly).