﻿
describe("A suite", function () {
	it("contains spec with an expectation", function () {
		expect(true).toBe(true);
	});
});

describe("A spec", function () {
	it("is just a function, so it can contain any code", function () {
		var foo = 0;
		foo += 1;

		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function () {
		var foo = 0;
		foo += 1;

		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});
});

describe("A spec (with setup and tear-down)", function () {
	var foo;

	beforeEach(function () {
		foo = 0;
		foo += 1;
	});

	afterEach(function () {
		foo = 0;
	});

	it("is just a function, so it can contain any code", function () {
		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function () {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});
});


describe("A spec", function () {
	var foo;

	beforeEach(function () {
		foo = 0;
		foo += 1;
	});

	afterEach(function () {
		foo = 0;
	});

	it("is just a function, so it can contain any code", function () {
		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function () {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});

	describe("nested inside a second describe", function () {
		var bar;

		beforeEach(function () {
			bar = 1;
		});

		it("can reference both scopes as needed ", function () {
			expect(foo).toEqual(bar);
		});
	});
});


xdescribe("A spec", function () {
	var foo;

	beforeEach(function () {
		foo = 0;
		foo += 1;
	});

	xit("is just a function, so it can contain any code", function () {
		expect(foo).toEqual(1);
	});
});