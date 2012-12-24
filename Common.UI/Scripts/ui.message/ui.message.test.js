(function ($) {

	var messageEl;

	jQuery.fn.isInDom = function () {
		return this.closest("html").length > 0;
	};

	QUnit.module("ui.message.js", {
		setup: function () {
			messageEl = $('<div id="testmessage"/>')
				.html("This is a test message.");
			this.clock = sinon.useFakeTimers();
		},

		teardown: function () {
			messageEl.message("destroy");
			this.clock.restore();
		}
	});


	QUnit.test("Creating a message does not cause an error.", function () {

		messageEl.message();
		QUnit.ok(true);
	});
	

	QUnit.test("Creating a message adds the element to the dom.", function () {

		QUnit.ok(messageEl.isInDom() === false);
		messageEl.message();
		QUnit.ok(messageEl.isInDom() === true);
	});
	

	QUnit.test("Destroying a message removes it and the element from the dom.", function () {

		messageEl.message();
		QUnit.ok(messageEl.isInDom() === true);
		QUnit.ok($("#message").isInDom() === true);
	
		messageEl.message("destroy");
		
		QUnit.ok(messageEl.isInDom() === false);
		QUnit.ok($("#message").isInDom() === false);
	});


	QUnit.test("The default close test is 'OK'.", function () {
		var actual, expected;

		expected = "OK";
		messageEl.message();

		actual = $("#message").find("a").text();

		QUnit.equal(actual, expected);
	});


	QUnit.test("Setting a closeText option sets the correct text.", function () {
		var actual, expected;

		expected = "Here is different close text";
		messageEl.message({
			closeText: expected
		});

		actual =$("#message").find("a").text();

		QUnit.equal(actual, expected);
	});


	QUnit.test("Setting the closeText option to falsy keeps the link from showing.", function () {
		var actual, expected;

		expected = 0;
		messageEl.message({
			closeText: ""
		});

		actual = messageEl.closest("#message").find("a").length;

		QUnit.equal(actual, expected);
	});


	QUnit.test("The message hides after 20 seconds by default.", function () {

		var stub = sinon.stub(jQuery.fn, "fadeOut", function (callback) {
			callback();
		});
		messageEl.message();
		QUnit.ok(messageEl.isInDom());
		this.clock.tick(20000);
		QUnit.ok(messageEl.isInDom() === false, "Message should not be in the dom.");
		stub.restore();
	});


	QUnit.test("The message hides after the # of seconds passed into the options.", function () {
		
		var stub = sinon.stub(jQuery.fn, "fadeOut", function (callback) {
			callback();
		});
		messageEl.message({timer: 5 });
		QUnit.ok(messageEl.isInDom());
		this.clock.tick(5000);
		QUnit.ok(messageEl.isInDom() === false, "Message should not be in the dom.");
		stub.restore();
	});


	QUnit.test("The destroy trigger is fired when after the message hides.", function () {

		QUnit.expect(2);
		var stub = sinon.stub(jQuery.fn, "fadeOut", function (callback) {
			callback();
		});

		messageEl.bind("messagedestroy", function () {
			QUnit.ok(true);
		});
		
		messageEl.message({
			destroy: function () {
				QUnit.ok(true);
			}
		});
		messageEl.message("destroy");
		stub.restore();
	});

})(jQuery);