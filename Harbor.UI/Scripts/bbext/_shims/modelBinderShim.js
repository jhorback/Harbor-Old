


bbext.modelBinderShim = function (modelBinder) {

    return {
        selector: function (el) {
            return el.find("[data-bind]:not([data-templatefrom]),[name],[id]").addBack("[data-bind]");
        },

        render: function (el, model, matches) {
            var binder,
				view = el.data("view"),
				listeners = view._listeners || (view._listeners = {}); // Backbone

            binder = modelBinder.create(model, el, matches);
            listeners[_.uniqueId("modelBinder")] = binder;
        }
    };
};


bbext.shim("modelBinderShim", [
	"modelBinder",
	bbext.modelBinderShim
]);