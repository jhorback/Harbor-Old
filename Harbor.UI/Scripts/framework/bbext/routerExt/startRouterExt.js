/*
Adds a start method to the router.
 - Define a 'root' property on the router object to be passed
   to the Backbone.history start call.
Also adds a bindAll method for convenience.
*/
bbext.startRouterExt = function () {
	return {
		start: function (options) {

			options = _.extend({
				pushState: true,
				root: this.root
			}, options);


			Backbone.history.start(options);
		}
	};
};


bbext.mixin("startRouterExt", [
	bbext.startRouterExt
]);