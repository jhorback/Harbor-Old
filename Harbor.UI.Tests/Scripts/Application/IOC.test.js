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
	var testFnDep = function () {
		return 23;
	};
	var testFn = function (testFnDep) {
		testVal = testFnDep();
	};
	debugger;
	IOC.register("testFnDep", testFnDep);
	IOC.register("test", testFn);
	ret = IOC.get("test");
	equal(23, testVal);

});

/*
next, and things to consider.
look at circular dependency checking
creating the call method
*/