

function modelBinderShim(_, modelBinder) {
	this._ = _;
	this.modelBinder = modelBinder;
}

modelBinderShim.prototype = {
	matches: function (el) {
		return el.find("[data-bind]:not([data-templatefrom]),[name],[id]").addBack("[data-bind]");
	},
	render: function (el, model, matches) {
		var binder,
		    view = el.data("view"),
			listeners = view._listeners || (view._listeners = {}); // Backbone
		
		binder = this.modelBinder.create(model, el, matches);
		listeners[this._.uniqueId("modelBinder")] = binder;
	}
};

context.module("bbext").shim("modelBinderShim", ["_", "modelBinder", bbext.modelBinderShim = modelBinderShim]);