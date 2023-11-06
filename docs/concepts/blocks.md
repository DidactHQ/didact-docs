`Blocks` are specialized wrappers for delegates that act as atomic building blocks for a `Flow`. Ideally, each atomic action within a `Flow` should be wrapped by and execute inside of a `Block` of some sort.

The delegate input is the central part of the `Block` and can be a multitude of various constructs, such as:

* A method defined somewhere in your class library or its dependencies.
* A `delegate`.
* An `Action`.
* A `Func`.
* A lambda expression.

`Blocks` track start and end execution times, emit internal logging events, encapsulate their own retry logic and timeout logic, and more.