(function ($) {

	var root = "/Tests/Controller/";

	QUnit.module("Controller.js", {
		setup: function () {

		},

		teardown: function () {
			if (Backbone.history) {
				Backbone.history.started = null;
				Backbone.history.stop();
			}
		}
	});


	QUnit.test("The root property is an empty string if not set.", function () {
		var test = new Controller();
		QUnit.equal(test.root, "");
	});

	QUnit.test("The root property, when set, returns the set value.", function () {
		var TestController = Controller.extend({
			root: root
		});
		var test = new TestController();
		QUnit.equal(test.root, root);
	});

	QUnit.test("Calling start calls Backbone.history.start and executes the route.", function () {
		QUnit.expect(1);
		var TestController = Controller.extend({
			root: root,
			routes: {
				"testRoute1": "testRoute1Method"
			},
			testRoute1Method: function () {
				QUnit.ok(true);
			}
		});

		var test = new TestController();
		test.start();
		test.navigate(root + "testRoute1", true);
		test.navigate("");
	});
	
	QUnit.test("Calling start calls the custom start method after calling Backbone.history.start.", function () {
		QUnit.expect(1);
		
		var TestController = Controller.extend({
			routes: {
				"test": "test"
			},
			start: function () {
				QUnit.ok(true);
			},
			test: function () { }
		});

		var c = new TestController();
		c.start();
	});

	QUnit.test("A view returned by a route is disposed when another view is called.", function () {
		QUnit.expect(1);

		var TestView = Backbone.View.extend({
			dispose: function () {
				QUnit.ok(true);
			}
		});

		var TestController = Controller.extend({
			root: root,
			routes: {
				"": "mainView",
				"test": "testMethod"
			},
			testMethod: function () {
				return new TestView();
			},
			mainView: function () {
				var view = new TestView();
				view.applifetime = true;
				return view;
			}
		});

		var test = new TestController();
		test.start();
		test.navigate(root + "test", true);
		test.navigate("", true);
	});
	
	// multiple routes are only curried once

	// application lifetime tests
	
	// linkClickHandler test
	

})(jQuery);