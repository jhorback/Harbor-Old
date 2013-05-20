/// <reference path="../../../harbor.ui/scripts/qunit.js" />
/// <reference path="../../../Harbor.UI/Scripts/Apps/Application/IOC.js" />


test("Register object, get object back", function () {
	var returnedObj,
		testObj = { test: 1 };
	IOC.register("test", testObj);
	returnedObj = IOC.get("test");
	
	equal(testObj, returnedObj);
});


test("Register function, function is calld", function () {
	var testVal = 0;
	var ret;
	var testFn = function () {
		testVal++;
	};
	

	IOC.register("test", testFn);
	ret = IOC.get("test");
	equal(1, testVal);

});


test("Register function with object dependency", function () {
	var testVal = 0;
	var ret;
	var testObj = { test: 23 };
	var testFn = function (testObj) {
		testVal = testObj.test;
	};
	
	IOC.register("testObj", testObj);
	IOC.register("test", testFn);
	ret = IOC.get("test");
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

	IOC.register("testDep", testDep);
	IOC.register("test", testFn);
	ret = IOC.get("test");
	equal(23, testVal);

});


test("Calling get on an un-registered dependency throws an error", function () {
	expect(1);
	try {
		var foo = IOC.get("foo");
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

	IOC.register("testDep", testDep);
	IOC.register("test", testFn);
	try {
		ret = IOC.get("test");
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

	IOC.register("testDep", testDep);
	ret = IOC.call(testFn);
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

	IOC.register("testDep", testDep);
	ret = IOC.call(testFn, [1]);
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

	IOC.register("testDep", testDep);
	ret = IOC.call(testFn, [], testFn);
	equal(23, testVal);
});