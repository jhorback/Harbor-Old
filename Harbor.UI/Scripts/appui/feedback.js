/*
Usage: 
	feedback.show("Three devices have been deleted");
	feedback.hide(); // hides any visible feedback, useful for when switch screens
	var wait = feedback.wait("Saving the user.");
	wait.finished();
	     - When calling finished without a message, this will simply close the message.
	wait.finished("The user was saved successfully.");
	wait.finishedMessage("The user was saved successfully."); 
	    - finishedMessage returns a curried function for use with deferreds

	var message = feedback.message(pending, completed, count);
        - kicks off the feedback timer and returns a function that can be used with a deferred
		- Usage: someRepo.getSomeResource().then(message);
		- If the count is included, pending and completed should be objects with 'singular' and 'plural' properties.
		    If the string has {{count}} in it, it will be replaced with the count variable.

Timer
    The feedback service provides access to the timer service as a convenience
	since they can be used together. i.e. feedback.timer.waitFor(dfds).then(wait.finished);

A feedback message is a DOM singleton with the folling markup.
<div id="message">
	<div class="alert">
		<div id="message-text">
		</div>
		<div class="message-close"></div>
	</div>
</div>
*/
function feedback($, timer) {

	var messageEl,
	    closeEl,
	    feedbackThreshold = 1000,
	    hideThreshold = 1000 * 60 * 5,
	    messageTemplate = '<div id="message"><div class="alert alert-warn"><div id="message-text"></div><div id="message-close">&times;</div></div></div>';

	function showMessage(message, dontShowClose, timerId) {
		ensureMessageEl();
		hideMessage().then(setMessageTextAndShow(message, dontShowClose, timerId));
	}

	function setMessageTextAndShow(message, dontShowClose, timerId) {
		return function () {
			messageEl.find("#message-text").html(message);
			dontShowClose === true ? closeEl.hide() : closeEl.show();
			messageEl.fadeIn();
			messageEl.data("timerId", timerId);
			setTimeout(hideMessage, hideThreshold);
		};
	}

	function ensureMessageEl() {
		if (!messageEl) {
			messageEl = $(messageTemplate);
			messageEl.hide();
			closeEl = messageEl.find("#message-close");
			closeEl.click(function (event) {
				hideMessage();
			});
			$("body").append(messageEl);
		}
	}

	function hideMessage(timerId) {
		var dfd = $.Deferred();

		if (!messageEl || messageEl.is(":hidden")) {
			dfd.resolve();
		} else {
			// messageEl && messageEl.fadeOut(dfd.resolve);
			if (!timerId || messageEl.data("timerId") === timerId) {
				messageEl.hide();
			}
			dfd.resolve();
		}

		messageEl && clearTimeout(messageEl.data("timerId"));
		return dfd.promise();
	}

	function pluralize(res, count) {
		return count === 1 ? res.singular : res.plural.replace("{{count}}", count);
	}

	return {
		timer: timer,

		show: showMessage,

		hide: hideMessage,

		wait: function (pendingMessage) {
			var thisTimerId;

			ensureMessageEl();

			thisTimerId = setTimeout(function () {
				showMessage(pendingMessage, true, thisTimerId);
			}, feedbackThreshold);
			
			return {
				finished: function (message) {
					clearTimeout(thisTimerId);

					if (typeof message !== "string") {
						hideMessage(thisTimerId);
					} else {
						showMessage(message, false);
					}
				},

				// curry for use with deferreds
				finishedMessage: function (message) {
					var feedback = this;
					return function () {
						feedback.finished(message);
					};
				}
			};
		},

		message: function (pendingMsg, finishedMsg, count) {
			return (count === void(0)) ?
				this.wait(pendingMsg).finishedMessage(finishedMsg) :
				this.wait(pluralize(pendingMsg, count)).finishedMessage(pluralize(finishedMsg, count));
		}
	};
};

appui.service("feedback", [
	"$",
	"timer",
	feedback
]);