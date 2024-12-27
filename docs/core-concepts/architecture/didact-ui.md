---
title: Didact UI
description: Didact UI is a VueJS single page app that functions as Didact's main user interface and web dashboard. Didact UI enables you to monitor FlowRuns, visualize FlowRun history, edit configurations, and more. 
---

# Didact UI

Didact UI is an essential part of the Didact platform. Any serious job orchestrator will strive to provide its users with a sleek, easy-to-use user interface, and Didact is no exception to this.

## Single Page App

Didact UI is a single page application (SPA) built primarily with VueJS. Single page apps are incredibly nimble, incredibly lightweight frontend web applications. They do not require complicated web servers to distribute them to users, their UX is typically exceptional (e.g. reactive state management and lightning fast routing), and they pair wonderfully with backend API technologies like dotnet web apis.

## Web Dashboard

Didact has quite a verbose data model, and I want to expose a plethora of useful metadata to you when you use Didact UI. As such, Didact UI comes with advanced dashboarding pages and UI elements, like fitlers, tables, charts, and so on.

## Separate App

I also want to draw attention to the fact that Didact UI is a dedicated, separate application from Didact Engine. This is somewhat different from other background job libraries.

For example, in Hangfire, both the Hangfire server and Hangfire web dashboard are oftentimes served from the same dotnet application. In some ways, this simplifies deployment since one application can handle both the job processing and the web dashboard. Technically, that is less apps for you to have to worry about in your infrastructure.

However, I have chosen not to follow this route for a few different reasons:

* Didact UI is not built with dotnet, it is built as an SPA with VueJS.
* While Didact Engine could most likely handle web dashboard requests and FlowRun execution at the same time, I really wanted to keep Didact Engine's responsibility focused on execution and API endpoints only.
* Separating Didact UI into its own application allows for more finely-tuned scaling if the need arises.

## Ease of Deployment

Since single page apps are so lightweight, you can serve them from a variety of locations. For example:

* I could wrap the single page app in a Docker container and publish a Docker image for users to pull.
* I could setup a reverse proxy on a VM, such as IIS or nginx, and run Didact UI as an application within the reverse proxy.
* I could wrap the static files of Didact UI in another dotnet app and build that dotnet app as a self-contained executable to be deployed as Windows Service.
* I could even translate Didact UI into a cross-platform desktop app with a technology like Electron (something I am very experienced with).

Whatever the exact case, I wanted the deployment of Didact UI to be as simple and painless as possible.