/// <reference path="../../../qunit.js" />
/// <reference path="../../../underscore.min.js" />
/// <reference path="../../../jquery-1.8.0.js" />
/// <reference path="../JSPM.js" />

QUnit.test("Installing a package returns a deferred which is executed.", function () {
	QUnit.expect(1);

	JSPM.install("Foo").then(function () {
		QUnit.ok(true, "Then callback ws called.");
	});
});


test("Installing a package executes the callback argument with proxy.", function () {
	expect(1);
	
	this.foo = true;
	
	JSPM.install("Foo", function () {
		ok(this.foo === true, "Then callback was called with the correct proxy.");		
	}, this);
});



test("Installing a package executes the callback argument with no proxy.", function () {
	expect(2);
	
	this.foo = true;
	
	JSPM.install("Foo", function () {
		ok(this.foo !== true, "Then callback was called with the correct proxy.");
		ok(this === JSPM, "'this' is JSPM.");
	});
});