/// <reference path="../_ref/bbext.js" />


module("appEvents.js");

window.debug = true;

test("Triggering an event calls the callback.", function () {

	var testApp = app("testApp");
	
	testApp.use("bbext");

	testApp.appEvents("appEvents", function () {
		
	}, {
		events: {
			"foo": "bar"
		},
		bar: function () {
			ok(true, "The event handler was called");
		}
	});

	testApp.start(function (appEvents, events) {
		appEvents.listen();
		events.trigger("foo");
		appEvents.stopListening();
	});
	
	testApp.start();
});

test("After a stopListening call, events are no longer triggered.", function () {
	expect(2);
	
	var testApp = app("testApp2");
	
	testApp.use("bbext");

	testApp.appEvents("appEvents", function () {
		
	}, {
		events: {
			"foo": "bar"
		},
		bar: function () {
			ok(true, "The event handler was called");
		}
	});

	testApp.start(function (appEvents, events) {
		appEvents.listen();
		events.trigger("foo");
		appEvents.listen();
		events.trigger("foo");
		appEvents.stopListening();
		events.trigger("foo");		
	});
	
	testApp.start();
});