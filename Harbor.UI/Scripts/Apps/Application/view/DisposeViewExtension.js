/*globals */
/*
* Desription: - as of Backbone 0.9.9 this is no longer needed
*     Adds cleanup to Backbone views; model bindings, child objects, element cleanup.
*
* Requires:
*     jQuery, Underscore, Backbone
*
* Usage:
*     // in init
*     DisposeViewExtension.extend(this); // where this is the view instance
*
*     // on view you can add custom dispose logic
*     dispose: function () {
*         // custom dispose logic
*         DisposeViewExtension.dispose.apply(this);
*     }
*
*     // or better yet, just implement an onDestroy method on the view which 
*     // will get called prior to any cleanup
*
* Methods:
*     bindTo(model, event, callback) - use instead of 'bind' to have the dispose() method perform cleanup.
*     dispose() - calls undbind, remove, and cleans up items added with the bindTo and views methods.
*         If dispose is passed false as an argument, the el of the view will not be removed.
*     track(object) - will keep a reference to the object and attempt to clean it up on dispose.
*/
(function ($, _) {

	var extension;

	extension = {
		bindTo: function (model, event, callback) {
			model.bind(event, callback, this);
			this._bindings.push({ model: model, event: event, callback: callback });
		},
		
		track: function (obj) {
			this._tracked.push(obj);
			return obj;
		},

		dispose: function (removeEl) {
			this.trigger("dispose");
			this.onDestroy && this.onDestroy.call(this);

			// remove bindings added via bindTo
			_.each(this._bindings, function (binding) {
				binding.model.unbind(binding.event, binding.callback);
			});
			this._bindings = [];

			// dispose all tracked objects
			_.each(this._tracked, function (obj) {
				if (obj.dispose) {
					obj.dispose();
				} else {
					obj.trigger && obj.trigger("dispose");
					obj.unbind && obj.unbind();
					obj.destroy && obj.destroy();
					obj.remove && obj.remove();
				}
				delete obj;
			});

			this.unbind(); // unbind bound events 
			if (removeEl !==  false) {
				this.remove(); // remove the element and element events
			}
		}
	};

	window.DisposeViewExtension = {
		dispose: extension.dispose,
		extend: function (instance) {
			var customDispose = instance.dispose;

			console.warn("The dispose view extension is deprecated.");
			_.extend(instance, {
				_bindings: [],
				_tracked: []
			}, extension);

			if (customDispose) {
				instance.dispose = customDispose;
			}
		}
	};

} (jQuery, _));