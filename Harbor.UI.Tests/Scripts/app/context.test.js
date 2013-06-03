/// <reference path="../../../harbor.ui/scripts/qunit.js" />
/// <reference path="../../../Harbor.UI/Scripts/app/context.js" />


module("context.js");


test("Register object, get object back", function () {
	var returnedObj,
		testObj = { test: 1 };
	var ctx = context.create();
	ctx.register("test", testObj);
	returnedObj = ctx.get("test");
	
	equal(testObj, returnedObj);
});


test("Register function, function is calld", function () {
	var testVal = 0;
	var ret;
	var testFn = function () {
		testVal++;
	};
	

	var ctx = context.create();
	ctx.register("test", testFn);
	ret = ctx.get("test");
	equal(1, testVal);

});


test("Register function with object dependency", function () {
	var testVal = 0;
	var ret;
	var testObj = { test: 23 };
	var testFn = function (testObj) {
		testVal = testObj.test;
	};
	
	var ctx = context.create();
	ctx.register("testObj", testObj);
	ctx.register("test", testFn);
	ret = ctx.get("test");
	equal(23, testVal);

});


test("Register function with function dependency", function () {
	var testVal = 0;
	var ret;
	var testDep = function () {
		this.testFn = function () {
			return 23;
		};
	};
	var testFn = function (testDep) {
		testVal = testDep.testFn();
	};

	var ctx = context.create();
	ctx.register("testDep", testDep);
	ctx.register("test", testFn);
	ret = ctx.get("test");
	equal(23, testVal);

});


test("Calling get on an un-registered dependency throws an error", function () {
	expect(1);
	try {
		var ctx = context.create();
		var foo = ctx.get("foo");
	} catch (e) {
		equal(e.message, "Unknown dependency: foo", e.message);
	}
});


test("Circular dependency is caught and error is thrown.", function () {
	var testVal = 0;
	var ret;
	var testDep = function (test) {
		this.testFn = function () {
			return 23;
		};
	};
	var testFn = function (testDep) {
		testVal = testDep.testFn();
	};

	var ctx = context.create();
	ctx.register("testDep", testDep);
	ctx.register("test", testFn);
	try {
		ret = ctx.get("test");
	} catch (e) {
		equal(e.message, "Circular reference: test -> testDep -> test", e.message);
	}
});


test("Calling call satisfies the dependencies.", function () {
	var testVal = 0;
	var ret;
	var testDep = function () {
		this.testFn = function () {
			return 23;
		};
	};
	var testFn = function (testDep) {
		testVal = testDep.testFn();
	};

	var ctx = context.create();
	ctx.register("testDep", testDep);
	ret = ctx.call(testFn);
	equal(23, testVal);
});


test("Calling call satisfies the dependencies and respects passed arguments.", function () {
	var testVal = 0;
	var ret;
	var testDep = function () {
		this.testFn = function () {
			return 22;
		};
	};
	var testFn = function (foo, testDep) {
		testVal = testDep.testFn() + foo;
	};

	var ctx = context.create();
	ctx.register("testDep", testDep);
	ret = ctx.call(testFn, [1]);
	equal(23, testVal);
});


test("Calling call satisfies the dependencies and respects the context.", function () {
	var testVal = 0;
	var ret;
	var testDep = function () {
		this.testFn = function () {
			return 23;
		};
	};
	var testFn = function (testDep) {
		this.testDep = testDep;
		this.contextFn();
	};
	testFn.contextFn = function () {
		testVal = this.testDep.testFn();
	};

	var ctx = context.create();
	ctx.register("testDep", testDep);
	ret = ctx.call(testFn, [], testFn);
	equal(23, testVal);
});



test("Registering multiple dependencies at the same time works.", function () {
	var testVal = 0;
	var ret;
	var testDep = function () {
		this.testFn = function () {
			return 25;
		};
	};
	var testFn = function (testDep) {
		testVal = testDep.testFn();
	};

	var ctx = context.create();
	ctx.register({
		"testDep": testDep,
		"test": testFn
	});
	ret = ctx.get("test");
	equal(25, testVal);
});



test("Passing more arguments than dependencies works on call.", function () {
	var testVal = 0;
	var testFn = function (arg1, arg2) {
		testVal = arg1 + arg2 + arguments[2];
	};

	var ctx = context.create();
	ctx.call(testFn, [1, 2, 3]);
	equal(6, testVal);
});



test("Getting a dependency with arguments works.", function () {
	var testFn = function (foo) {
		return {
			test: function () {
				return foo.testVal;
			}
		};
	};
	
	var ctx = context.create();
	ctx.register("foo", {
		testVal: 24
	});

	ctx.register("test", testFn);
	ctx.register("test2", testFn);

	var test1 = ctx.get("test");
	equal(test1.test(), 24);


	var test2 = ctx.get("test2", [{
		testVal: 23
	}]);
	
	equal(test2.test(), 23);

});


test("Two containers are separated", function () {
	expect(5);
	
	var testObj = { test: 23 };
	var ctx1 = context.create();
	var ctx2 = context.create();
	ctx1.register("foo", testObj);

	var val1 = ctx1.get("foo");
	var val2;
	try {
		val2 = ctx2.get("foo");
	} catch (e) {
		ok(true);
	}
	equal(val1, testObj);
	notEqual(val2, testObj);
	testObj.test = 24;

	ctx2.register("foo", testObj);
	val2 = ctx2.get("foo");
	equal(val2, testObj);
	equal(ctx1.get("foo").test, 24);
});