---
title: Smart Keys
description:
---

# Smart Keys

Smart keys are the second local component of the licensing system. Essentially, they are cryptographically-signed JSON payloads containing licensing and customer data which are stored internally into the Didact database. These payloads unlock enhanced features within the Didact platform and allow [failsafe mechanics](/core-concepts/licensing-system/failsafe-mechanics) to activate in case of a licensing system outage.

## Smart key lifecycle

When Didact starts up, 