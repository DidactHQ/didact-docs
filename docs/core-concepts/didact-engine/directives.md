# Directives

Directives are essentially functional roles/responsibilities that you assign to Didact Engine. Each directive has Didact Engine perform different functions in the job orchestration process.

If a directive is not specified in Didact Engine's [runtime environment variables](/core-concepts/didact-engine/environment-variables), then a `Default` directive is assigned to Didact Engine.

As stated elsewhere, in order for Didact Engine to run database migrations, it must be assigned the `Leader` directive.

The possible directive values are shown below:

| Name | Explanation |
| --- | --- |
| `Default` | The default directive if one is not specified. |
| `Leader` | The directive indicating that Didact Engine is the lead node. This directive will run the [database migrations](/core-concepts/didact-engine/database-migrations). |