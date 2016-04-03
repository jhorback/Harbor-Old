


bbext.modelBinderShim = function (modelBinder) {

	return {
		selector: function (el) {
			return el.find("[data-bind]:not([data-view-from]),[name],[id]").addBack("[data-bind]");
		},

		render: function (el, model, matches) {
		    var binder,
		        view = el.data("view"),
		        listeners = view._listeners || (view._listeners = {}), // Backbone
		        binderId = _.uniqueId("modelBinder");

		    binder = modelBinder.create(model, el, matches);
		    binder.listeningTo = []; // Backbone
		    //binder.objId = binderId;
			listeners[binderId] = binder;
		}
	};
};


bbext.shim("modelBinderShim", [
	"modelBinder",
	bbext.modelBinderShim
]);