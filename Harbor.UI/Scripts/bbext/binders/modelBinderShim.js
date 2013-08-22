

function modelBinderShim(_, modelBinder) {
	this._ = _;
	this.modelBinder = modelBinder;
}

modelBinderShim.prototype = {
	selector: "[data-bind],[name],[id]",
	render: function (el, model, matches) {
		var binder,
		    view = el.data("view"),
			listeners = view._listeners || (view._listeners = {}); // Backbone

		binder = this.modelBinder.create(model, el, matches);
		listeners[this._.uniqueId("modelBinder")] = binder;
	}
};

context.module("bbext").shim("modelBinderShim", ["_", "modelBinder", bbext.modelBinderShim = modelBinderShim]);