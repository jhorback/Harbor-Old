
// register the global libraries as modules
context.module("jQuery").register("$", jQuery, "function");
context.module("Underscore").register("_", _, "function");
context.module("Backbone").register("Backbone", Backbone).use("Underscore", "jQuery");
