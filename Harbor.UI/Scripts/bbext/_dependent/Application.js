/*
 *	Creates a standard facade for common application components.
 *
 *	Usage:
 *		var MyApp = new Application({
 *			root: "path/to/app",
 *			
 *			routes: {
 *				"": "main",				
 *				"*defaultRoute": "main"
 *			},
 *	
 *			regions: {
 *				"default": "#some-container",				
 *			},
 *	
 *			start: function () {
 *				// fetch data, set up app, etc...
 *			},
 *	
 *			main: function () {						
 *				return {
 *					view: view,
 *					navigate: "/"
 *				};
 *			}
 *		});
 *
 *	Shared event aggregation (all new Application objects will share the same 'events' channel):
 *	MyApp.events.on("object:event", fn);
 *	MyApp.events.trigger("object:event", arg1, arg2);
 *	MyApp.events.off("object:event", fn);
 *
 *	Application views and models that use all view and model extensions:
 * 	    var MyView = Application.View.extend({ ... });
 *	    var MyModel = Application.Model.extend({ ... });
 *
 *	Note:
 *      There is no need of stop method since regions and self management perform cleanup as needed.
 *
 */
var Application = function (options) {
	var App, app;

	App = Controller.extend(options);
	app = new App();
	app.events = Application.events;
	return app;
};


Application.events = { };
_.extend(Application.events, Backbone.Events);


Application.url = function (url) {
	/// <summary>Adds the base url to the url (including the '/'). Session.url() will go home.</summary>
	return (window.baseUrl || "") + (url || "");
};


if (window.Application) {
	context.app("Application").use("bbext").start([
		"jstViewExtension",
		"modelBinderExtension",
		"bbext.backupModelExt",
		"bbext.getSetModelExt",
		"bbext.validationModelExt",
		"viewMixins",
		"ajaxRequest",
		"bbext.errorDisplayViewExt",
		
	function (
		jstViewExtension,
		modelBinderExtension,
		backupModelExt,
		getSetModelExt,
		validationModelExt,
		viewMixins,
		ajaxRequest,
		errorDisplayViewExt) {

		// create the application view with all view extensions
		Application.View = viewMixins.mixin(Backbone.View.extend({}));
		modelBinderExtension.extend(Application.View.prototype);
		jstViewExtension.extend(Application.View.prototype);
		errorDisplayViewExt.extend(Application.View.prototype);


		// create the application model with all model extensions
		Application.Model = Backbone.Model.extend({});
		backupModelExt.extend(Application.Model.prototype);
		getSetModelExt.extend(Application.Model.prototype);
		validationModelExt.extend(Application.Model.prototype);
			
		window.AjaxRequest = ajaxRequest;
			
	}]).start();
}



// jch* - figure the best way to inject this
/*
Module: harborConfig?
baseUrl wold be an injected property
baseUrl could be a service?
*/
if (window.JSPM) {
	JSPM.pkgSrc = Application.url("home/jspm");
}
