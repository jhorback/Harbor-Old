(function ($) {

	var TestModel = Backbone.Model.extend({
		defaults: {
			testProp1: null,
			testEmail: null
		},

		initialize: function () {
			ValidationModelExtension.extend(this);
		},

		testProp1: {
			validate: {
				required: true
			}
		},
		
		testEmail: {
			validate: {
				email: true
			}
		}
	});


	QUnit.module("ValidationModelExtension.js", {
		setup: function () {

		},

		teardown: function () {

		}
	});


	QUnit.test("An error event is triggered on the model when an error occurs and contains the correct error message in an array.", function () {
		QUnit.expect(2);
		
		var tm = new TestModel({ testProp1: "foo" });

		tm.bind("error", function (model, errors) {
			QUnit.ok(_.isArray(errors.testProp1));
			QUnit.equal("Required.", errors.testProp1[0]);
		});

		tm.set("testProp1", "");
	});
	
	
	QUnit.test("An error event is triggered on the model when an error is cleared with a null errors parameter.", function () {
		QUnit.expect(2);
		
		var tm = new TestModel({ testProp1: "foo" });

		tm.bind("error", function (model, errors) {
			if (errors) {
				QUnit.equal("Required.", errors.testProp1[0]);
			}
			if (errors === null) {
				QUnit.ok(true);				
			}
		});

		tm.set("testProp1", "");
		tm.set("testProp1", "foo");		
	});


	QUnit.test("An error event is not triggered if a field changes from valid to valid.", function () {
		QUnit.expect(1);
		
		var tm = new TestModel({ testProp1: "foo" });

		tm.bind("error", function (model, errors) {
			QUnit.ok(false, "Method should not be called.");
		});

		tm.set("testProp1", "still valid");
		QUnit.ok(true);
	});
	

	QUnit.test("The email validator validates emails.", function () {
		QUnit.expect(2);
		
		var tm = new TestModel({ testProp1: "foo", testEmail: "john@test.com" });

		tm.bind("error", function (model, errors) {
			if (errors) {
				QUnit.ok(true);
			} else {
				QUnit.ok(true);
			}
		});

		tm.set("testEmail", "valid@email.com");
		tm.set("testEmail", "invalid email.");
		tm.set("testEmail", "valid@email.com");		
	});
	
	QUnit.test("Calling getErrors returns the expected errors.", function () {
		QUnit.expect(2);

		var tm = new TestModel({ testProp1: "", testEmail: "invalidemailtest.com" });

		var errors = tm.getErrors();

		QUnit.equal("Required.", errors.testProp1[0]);
		QUnit.equal("Invalid email.", errors.testEmail[0]);
	});
	
	QUnit.test("An null non-required validation field should not cause an error.", function () {
		QUnit.expect(1);
		
		var tm = new TestModel({ testEmail: "valid@email.com" });

		tm.bind("error", function (model, errors) {
			QUnit.ok(false, "No error should occur.");
		});

		tm.set("testEmail", null);
		QUnit.ok(true);
	});
	
	
	QUnit.test("Using an invalid validator throws an error.", function () {
		QUnit.expect(1);
		
		var TestModel2 = Backbone.Model.extend({
			initialize: function () {
				ValidationModelExtension.extend(this);
			},

			testProp1: {
				validate: {
					validatorDoesNotExist: true
				}
			}
		});

		var tm = new TestModel2();
		try {
			tm.set("testProp1", "foo");
		} catch (e) {
			QUnit.equal(e, "Validator does not exist: validatorDoesNotExist");
		}
	});


	QUnit.test("Custom validators are called.", function () {
		QUnit.expect(1);
		
		var errorMsg = "This is an error from a custom validator";
		
		var TestModel2 = Backbone.Model.extend({
			initialize: function () {
				ValidationModelExtension.extend(this);
			},

			testProp1: {
				validate: {
					custom: function () {
						return errorMsg;
					}
				}
			}
		});

		var tm = new TestModel2();
		tm.bind("error", function (model, errors) {
			QUnit.equal(errorMsg, errors["testProp1"][0]);
		});
	
		tm.set("testProp1", "foo");
	});
	
	QUnit.test("Extending global validators are called.", function () {
		QUnit.expect(2);
			
		var TestModel2 = Backbone.Model.extend({
			initialize: function () {
				ValidationModelExtension.extend(this);
			},

			testProp1: {
				validate: {
					extended: 123
				}
			}
		});

		ValidationModelExtension.validators["extended"] = function (value, arg) {
			QUnit.equal("foo", value);
			QUnit.equal(123, arg);			
		};

		var tm = new TestModel2();
		tm.set("testProp1", "foo");
	});
	
	QUnit.test("The property name that caused an error is passed to the error handler.", function () {
		QUnit.expect(1);
		
		var tm = new TestModel({ testProp1: "foo" });

		tm.bind("error", function (model, errors, propertyName) {
			QUnit.equal(propertyName, "testProp1");
		});

		tm.set("testProp1", "");
	});


	QUnit.test("Errors from the model validate method are returned in getErrors.", function () {
		QUnit.expect(1);

		var tm = new TestModel({ testProp1: "test" });
		tm.validate = function () {
			return { "": ["General error."] }; // can use ModelErrors.js to help build this object
		};

		var errors = tm.getErrors();

		QUnit.equal("General error.", errors[""][0]);
	});
})(jQuery);