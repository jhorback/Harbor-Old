/*
Adds a start method to the router.
 - Define a 'root' property on the router object to be passed
   to the Backbone.history start call.
Also adds a bindAll method for convenience.
*/
function startRouterExt(mixin, Backbone, _) {
	var routerMixin, extension;
	
	extension = {
		start: function (options) {

			options = _.extend({
				pushState: true,
				root: this.root
			}, options);
			

			Backbone.history.start(options);
		},

		bindAll: function (methodNames) {
			var args = Array.prototype.slice.apply(arguments);
			args.unshift(this);
			_.bindAll.apply(_, args);
		}
	};

	routerMixin = mixin("router");
	routerMixin.register("bbext.startRouterExt", extension);
}


bbext.config(["mixin", "Backbone", "_", startRouterExt]);