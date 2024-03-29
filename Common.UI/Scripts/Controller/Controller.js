﻿/*
 * Controller.js
 */
/*
 * Description:
 *     The Controller is a Backbone Router that adds lifetime management to views.
 *
 * Usage:
 *     Create the controller as if you would a Backbone Router.
 *     Views that are returned by route functions will have a route lifetime,
 *     meaning they will be 'disposed' when a new view is retuned.
 *
 *     SomeController = Controller.extend({
 *         root: "/Root/Url/",
 *         start: function () {
 *             // optional start method - can return a deferred which will delay the router start call
 *         },
 *         routes: {
 *             "": "main",
 *             "item/:id": "item"
 *         },
 *         regions: { // the controller uses the RegionManager to turn these into regions.
 *             "default": "#default-el",
 *             "mainRegion": "#main-el"
 *         },
 *         main: function () {
 *             var view = new MainView();
 *             return {
 *                 view: view,
 *                 navigate: "/",
 *                 region: "mainRegion" // or this.regions.mainRegion
 *             };
 *         },
 *         item: function (id) {
 *             this.navigate("item/" + id); // keep history in sync manually
 *             return new ItemView(); // will use the default region
 *         }
 *     });
 *
 * View managmenet:
 *     Returning a view will allow the controller to manage the view lifetime.
 *     You can also return an object containing the view and additional instructions
 *     on how to handle the view lifetime:
 *         return {
 *             view: view,
 *             navigate: "", // set if needing to keep the history in sync
 *             region: "someKey" // the region name (or region itself) to show the view in.
 *         };
 *
 * 'root' property:
 *     An optional 'root' property can be set in the controller extension
 *     for history and link management.
 *     
 * 'start' method:
 *     An start method can be called to start Backbone.history.
 *     Calling this method will in turn call any 'start' method defined on
 *     the controller extension.
 *     
 *     var someController = new SomeController();
 *     someController.start();
 *
 * Clicking Links
 *     Controllers have a 'linkClickHandler' method that can be used for links.
 *     events: {
 *         "click a": someController.linkClickHandler
 *     }
 */
(function () {

	var Controller = Backbone.Router.extend({
		constructor: function (options) {
			var customStart = this.start,
				controller = this,
				curriedMethods = { };

			Region.createRegions(this);

			// curry the route methods
			_.each(this.routes, function (methodName, route) {
				var method = controller[methodName];
				
				// ensure the method is only curried once
				if (curriedMethods[methodName]) {
					return;
				}

				curriedMethods[methodName] = controller[methodName] = function () {
					var result, view, region, navigate;

					result = method.apply(controller, arguments);

					if (result.view) {
						view = result.view;
						region =  result.region ? result.region : controller.regions["default"];
						navigate = result.navigate;
					} else {
						view = result;
						region = controller.regions["default"];
					}

					region.render(view);
					navigate && controller.navigate(navigate);
					result.afterRender && result.afterRender.apply(controller); 
				};
			});

			Backbone.Router.prototype.constructor.apply(this, arguments);
			this.root = this.root || "";
			this.start = function () {
				/// <summary>Starts Backbone.history and calls any custom start method.</summary>
				var dfd = customStart && customStart.apply(this, arguments);
				if (controller._started === true) {
					throw "Start has already been called.";
				}
				dfd = dfd || { then: function (callback) { callback.call(); }};
				
				controller._started = true;
				dfd.then(function () {
					controller.routes && Backbone.history.start({
						pushState: true,
						root: controller.root
						//, silent: true
					});
				});
			};

			_.bindAll(this, "handleLinkClick");
		},
		
		destroy: function () {
			delete this._started;
			_.chain(this.regions).values().invoke("destroy");			
		},
		
		handleLinkClick: function (event) {
			var href = $(event.target).closest("a").attr("href");
			event.preventDefault();
			this.navigate(href.toLowerCase().replace(this.root.toLowerCase(), ""), true);
		}
	});

	window.Controller = Controller;
})();