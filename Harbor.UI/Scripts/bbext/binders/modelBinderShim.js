

function modelBinderShim(_, modelBinder) {
	this._ = _;
	this.modelBinder = modelBinder;
}

modelBinderShim.prototype = {
	render: function (el, model) {
		var binder,
		    view = el.data("view"),
			listeners = view._listeners || (view._listeners = {}); // Backbone

		binder = this.modelBinder.create(model, el);
		listeners[this._.uniqueId("modelBinder")] = binder;
	}
};

context.module("bbext").shim("modelBinderShim", ["_", "modelBinder", bbext.modelBinderShim = modelBinderShim]);