

function modelBinder(_, modelBinderFactory) {
	this._ = _;
	this.modelBinderFactory = modelBinderFactory;
}


modelBinder.prototype = {
	render: function (el, model) {
		var binder,
		    view = el.data("view"),
			listeners = view._listeners || (view._listeners = {}); // Backbone

		binder = this.modelBinderFactory.create(model, el);
		listeners[this._.uniqueId("modelBinder")] = binder;
	}
};

context.module("bbext").shim("modelBinder", ["_", "modelBinderFactory", modelBinder]);