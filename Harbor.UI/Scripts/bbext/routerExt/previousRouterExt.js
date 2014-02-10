/*
Tracks urls that are navigated to and provides a 'previous' method that will
navigate to the previous url.

Useful for modals.

The previous method returns false if there is not a url to go to, allowing
a router to navigate to a default url.
    example: this.previous() || this.default();
*/
function previousRouterExt(mixin, Backbone) {
	var routerMixin, extension;
	
	extension = {
		afterInit: function () {
			this.history = [];
		},

		navigate: function(fragment, options) {
			Backbone.history.navigate(fragment, options);
			this.history.push(Backbone.history.fragment);
			if (this.history.length > 10) { // keep the history at 5-10 elements
				this.history.splice(0, 5);
			}
			return this; 
		},

		previous: function () {
			var url;
			if (this.history.length > 1) {
				url = this.history[this.history.length - 2];
				this.navigate(url, true);
				return true;
			} else {
				return false;
			}
		}
	};

	routerMixin = mixin("router");
	routerMixin.register("bbext.previousRouterExt", extension);
}


bbext.config(["mixin", "Backbone", previousRouterExt]);