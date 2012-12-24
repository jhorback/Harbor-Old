/*globals window, setTimeout, clearTimeout, jQuery */
/*!
 * Feedback.js v1.0.1
 *     modified - for jslint
 */
 /*
 * Description:
 *     Provides a feedback message after 1 second while the user is waiting for an async call to finish.
 *
 * Dependencies:
 *     jquery.ui.widget.js
 *     ui.message.js
 * 
 * Usage:
 *     var feedback = Feedback("Waiting for the response...");
 *     $.get("some/url").then(function () {
 *         feedback.finished("This is an optional message to show when the feedback is finished.");
 *     });
 */
(function ($) {

	var Feedback = function (feedback) {
		/// <summary>
		///     Provides a feedback message while the user is waiting for an async call to finish.
		///     Use the finished method to indicate the async call is finished. The message is optional.
		/// </summary>
		
		if (this instanceof Feedback === false) {
			return new Feedback(feedback);
		}

		this.timeoutID = setTimeout($.proxy(function () {
			this.message(feedback);
		}, this), this.timer);
	};

	Feedback.prototype = {
		timer: 1000,
		timeoutID: null,
		messageEl : null,

		message: function (msg, showOk) {
			this.messageEl = $('<div/>');
			this.messageEl.html(msg);
			showOk === true ? 
				this.messageEl.message() :
				this.messageEl.message({ closeText: null }); //ignore jslint
		},

		finished: function (finishedMessage) {
			clearTimeout(this.timeoutID);
		
			if (finishedMessage) {
				this.message(finishedMessage, true);
			} else {
				this.messageEl && this.messageEl.message("hide"); //ignore jslint
			}
		}
	};

	window.Feedback = Feedback;
}(jQuery));
