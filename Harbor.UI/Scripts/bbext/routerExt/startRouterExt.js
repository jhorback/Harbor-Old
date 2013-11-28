/*
Adds a start method to the router.
*/
function startRouterExt(mixin, Backbone) {
	var routerMixin, extension;
	
	extension = {
		start: function (options) {
			Backbone.history.start({
				pushState: true,
				root: this.root
			});
		}
	};

	routerMixin = mixin("router");
	routerMixin.register("bbext.startRouterExt", extension);
}


bbext.config(["mixin", "Backbone", startRouterExt]);