(function ($) {

	var mockJqueryFn;

	QUnit.module("Feedback.js", {
		setup: function () {
			
			this.clock = sinon.useFakeTimers();
			mockJqueryFn = sinon.mock(jQuery.fn);
		},

		teardown: function () {

			this.clock.restore();
			mockJqueryFn.restore();
		}
	});


	QUnit.test("Creating Feedback not cause an error.", function () {

		var feedback = Feedback();

		QUnit.ok(true);
	});


	QUnit.test("Feedback opens a message after 1 second.", function () {

		var expectMessage = mockJqueryFn.expects("message");
		expectMessage.once();
			
		var feedback = Feedback();
		
		this.clock.tick(1000);
		QUnit.ok(expectMessage.verify());
	});
	

	QUnit.test("Initial feedback message does not have a close link.", function () {

		var expectMessage = mockJqueryFn.expects("message");
		expectMessage.withArgs({ closeText: null });
			
		var feedback = Feedback("Here is some feedback text.");
		this.clock.tick(1000);
		QUnit.ok(expectMessage.verify());
	});
	

	QUnit.test("Final feedback message called without options and so has a close link.", function () {

		var expectMessage = mockJqueryFn.expects("message");
		expectMessage.withArgs();
			
		var feedback = Feedback("Here is some feedback text.");
		feedback.finished("Here is a finished message.");
		QUnit.ok(expectMessage.verify());
	});
	

	QUnit.test("Feedback and finished message both called.", function () {

		var expectMessage = mockJqueryFn.expects("message");
		expectMessage.twice();
			
		var feedback = Feedback("Here is some feedback text.");
		this.clock.tick(2000);
		feedback.finished("Here is a finished message.");
		
		QUnit.ok(expectMessage.verify());
	});
})(jQuery);