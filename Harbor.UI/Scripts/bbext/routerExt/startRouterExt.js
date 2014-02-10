/*
Adds a start method to the router.
 - Define a 'root' property on the router object to be passed
   to the Backbone.history start call.
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
		}
	};

	routerMixin = mixin("router");
	routerMixin.register("bbext.startRouterExt", extension);
}


bbext.config(["mixin", "Backbone", "_", startRouterExt]);