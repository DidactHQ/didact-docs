---
title: Didact CLI
description:
---

# Didact CLI

Here we review the Didact CLI and its central role in interacting with the Didact platform. It is intended to be an ultra-convenient devtool to manipulate Didact's app and your flow libraries in whatever way you desire.

## Easy Install

Didact CLI is prebuilt and provided as-is for easy installation.

You can use an install script from the [didact-install-scripts](https://github.com/DidactHQ/didact-install-scripts) repository directly in your terminal. There is an install script for Windows, Linux, and Mac OS, so simply copy and paste the appropriate script into your terminal and then execute the command.

You can also directly download the Didact CLI binary from the [Releases page](https://github.com/DidactHQ/didact/releases) of the main [Didact repository](https://github.com/DidactHQ/didact).

## Install Other Apps

Didact CLI provides convenient commands for installing the other Didact apps, namely, Didact Engine and Didact UI. See the [didact-engine-install](/api/didact-cli/engine-install) and [didact-ui-install](/api/didact-cli/ui-install) commands, respectively.

## Database Migrations

Didact CLI provides a [migrate command](/api/didact-cli/migrate) for easily running database migrations against the metadata database.

## Define Config files

Didact CLI provides convenient commands for creating, setting, and inspecting config files for Didact CLI, Didact Engine, and Didact UI. See the respective config CLI commands in the API.

## Automate CICD

It is likely that you will want to automate various Didact-related tasks in CICD processes, such as GitHub actions pipelines. For example, you may want to automate deploying a flow library or automate installing Didact Engine on a given compute resource. This is one of the primary reasons that Didact CLI was created.

## Platform Updates

TODO