
// binds the model "error" event to the
// errorBinderViewExt methods

function errorBinderShim($) {

	this.$ = $;
}

errorBinderShim.prototype = {	
	render: function (el, model) {
		var view = el.data("view"),
		    $ = this.$;
		
		if (!view) {
			return;
		}

		view.stopListening(model, "error", binder);
		view.listenTo(model, "error", binder);

		function binder(model, errors, property) {
			if (errors && errors.readyState) { // xhr error
				return;
			}
			if ($.isPlainObject(property)) { // is it comming from backbones validate
				view.displayErrors(errors);
			} else {
				view.displayError(property, errors);
			}
		}
	}	
};

bbext.shim("errorBinderShim", ["$", errorBinderShim]);
