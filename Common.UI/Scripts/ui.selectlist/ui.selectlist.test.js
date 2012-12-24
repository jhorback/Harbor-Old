(function ($) {

	var testListEl;
	
	QUnit.module("ui.selectlist.js", {
		setup: function () {
			testListEl = $('<ul/>').html(
				'<li><input type="checkbox"/><span id="testitem-text">Row text...</span></li>'
			);
		},

		teardown: function () {
			testListEl.remove();		
		}
	});


	QUnit.test("Creating a select list does not cause an error.", function () {

		testListEl.selectlist();
		QUnit.ok(true);
	});
	

	QUnit.test("Clicking a row adds a selected class name.", function () {

		testListEl.selectlist();
		testListEl.find("#testitem-text").click();
		
		QUnit.ok(testListEl.find("li.selected").length > 0);
	});
	

	QUnit.test("Clicking a row triggers a change event.", function () {

		QUnit.expect(1);
		testListEl.selectlist();
		testListEl.bind("selectlistchange", function () {
			
			QUnit.ok(true);
			QUnit.start();
		});

		QUnit.stop();
		testListEl.find("#testitem-text").click();
	});
	

	QUnit.test("Clicking a row triggers the change callback.", function () {

		QUnit.expect(1);
		testListEl.selectlist({
			change: function () {
				QUnit.ok(true);
				QUnit.start();
			}
		});

		QUnit.stop();
		testListEl.find("#testitem-text").click();
	});

	
	// could test for:
	// rowSelector (default li and change to tr)
	// hideInputs (that the inputs are hidden)
	// test for radio, input, and link click

})(jQuery);