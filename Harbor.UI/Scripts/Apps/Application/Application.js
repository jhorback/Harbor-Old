/*
	Creates a standard facade for common application components.

	Usage:
		var MyApp = new Application({
			root: "path/to/app",
			
			routes: {
				"": "main",				
				"*defaultRoute": "main"
			},
	
			regions: {
				"default": "#some-container",				
			},
	
			start: function () {
				// fetch data, set up app, etc...
			},
	
			main: function () {						
				return {
					view: view,
					navigate: "/"
				};
			},

			stop: function () {
				// perform any neccessary cleanup
			}
		});

	// shared event aggregation (all new Application objects will share the same 'events' channel);
	MyApp.events.on("event", fn);
	MyApp.events.trigger("event", arg1, arg2);
	MyApp.events.off("event", fn);

	// Application views and models that use all view and model extensions
	var MyView = Application.View.extend({ ... });
	var MyModel = Application.Model.extend({ ... });
*/

var Application = function (options) {
	var App, app, customStop;

	App = Controller.extend(options);
	app = new App();
	app.events = Application.events; // jch! - would still like to try on/off/destroy to be managed by the applicaiton - try this again
	customStop = app.stop;
	app.stop = function () {
		app.destroy();
		customStop && customStop.apply(app, arguments);
	};
	return app;
};


Application.events = { };
_.extend(Application.events, Backbone.Events);


Application.url = function (url) {
	/// <summary>Adds the base url to the url (including the '/'). Session.url() will go home.</summary>
	return (window.baseUrl || "") + (url || "");
};