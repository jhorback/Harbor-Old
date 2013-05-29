/// <reference path="../../../harbor.ui/scripts/qunit.js" />
/// <reference path="../../../Harbor.UI/Scripts/Application/IOC.js" />
/// <reference path="../../../Harbor.UI/Scripts/Application/launch.js" />


module("launch.js", {
	teardown: function () {
		IOC.clear();
	}
});


test("Call to construct adds the construct symbol to the correct global object.", function () {
	var ret;
	var foo = launch;
	var fnToReturn = function () { };
	var fnToReturn2 = function () { };

	expect(3);

	launch.construct("test", function () {
		equal(foo, this);
		return function () {
			return fnToReturn;
		};
	});

	ret = foo.test("testItem", fnToReturn);
	equal(ret, fnToReturn);
	notEqual(foo.test, fnToReturn2, "foo.test is not fnToReturn2");
});


test("Basic construction and registration works.", function () {

	var testConstruct = function () { this.testVal = 23;  };

	launch.construct("test", function () {
		return function (construct) {
			// allows for currying and extensions here.
			return construct;
		};
	});

	launch.test("testItem", testConstruct);
	equal(launch.get("testItem").testVal, 23);
});


test("Both the construct and the instance have their dependencies injected.", function () {
	launch.register("fooDependency", {
		fooTest: 23
	});

	launch.construct("test", function (fooDependency) {
		return function (construct) {
			construct.prototype.extendedMethod = function (num) {
				return this.fooDependency.fooTest + fooDependency.fooTest + num;
			};
			return construct;
		};
	});

	launch.test("TestConstruct", function (fooDependency) {
		this.fooDependency = fooDependency;
	});

	var tc = launch.get("TestConstruct");
	var ret = tc.extendedMethod(23);
	equal(ret, 69, ret);
});
