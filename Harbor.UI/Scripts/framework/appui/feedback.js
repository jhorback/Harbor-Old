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

	feedback.pluralize(res, count) - exposed for convenience

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
/**
 * @memberof appui
 * @class
 */
function feedback($, timer) {

	var messageEl,
	    closeEl,
	    feedbackThreshold = 500,
	    hideThreshold = 1000 * 60 * 1,
	    messageTemplate = '<div id="message"><div class="border-radius pad box-message"><div id="message-text"></div><div id="message-close"><i class="icon-close"></i></div></div></div>';

    /**
     * Shows the provided message in a feedback widget
     * @param {string} message
     * @param {boolean} dontShowClose - set to true to hide the close button in the message widget
     * @param {object} timerId
     */
	function showMessage(message, dontShowClose, timerId) {
		ensureMessageEl();
		hideMessage().then(setMessageTextAndShow(message, dontShowClose, timerId));
	}

	function setMessageTextAndShow(message, dontShowClose, timerId) {
		return function () {
			messageEl.find("#message-text").html(message);
			dontShowClose === true ? closeEl.hide() : closeEl.show();
			messageEl.slideDown(300);
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

    /**
     * Hides any message shown using the provided timerId. If no timerId is provided, will hide any open message.
     * @param {string|number=} [timerId]
     * @returns {promise}
     */
	function hideMessage(timerId) {
		var dfd = $.Deferred();

		if (!messageEl || messageEl.is(":hidden")) {
			dfd.resolve();
		} else {
			// messageEl && messageEl.fadeOut(dfd.resolve);
			if (!timerId || messageEl.data("timerId") === timerId) {
				messageEl.slideUp(300);
			}
			dfd.resolve();
		}

		messageEl && clearTimeout(messageEl.data("timerId"));
		return dfd.promise();
	}

    /**
     * Generates a string from the provided params, where the result will be a singular form of the word if count === 1, or a plural form
     * of the word otherwise.
     * @param {{singular:string,plural:string}} res - An object with `singular` and `plural` properties that should be the singular and plural forms of
     *   whatever is being counted. If the `plural` string contains {{count}} it will be replaced with the actual count.
     * @param {number} count - the count of the thing being counted
     * @returns {string}
     */
	function pluralize(res, count) {
		return count === 1 ? res.singular : res.plural.replace("{{count}}", count);
	}

    /** @lends appui.feedback.prototype */
	return {

		timer: timer,

		show: showMessage,

		hide: hideMessage,

		pluralize: pluralize,

        /**
         * Disables the specified field while showing an optional message (default to "Saving..."), returns
         * a function to re-enable the field.
         * @param {jQuery} $field
         * @param {string=} [message="Saving..."]
         * @returns {{enable: Function}}
         */
		disable: function ($field, message) {
            var fieldWidth;
			message = message || "Saving...";
            // Save current width so field doesn't resize when contents change
            fieldWidth = $field.width();
            $field.width(fieldWidth);
			$field.data("previousHtml", $field.html());
			$field.html(message);
			$field.attr("disabled", true);

			return {
				enable: function () {
					$field.html($field.data("previousHtml"));
					$field.removeAttr("disabled");
				}
			}
		},

        /**
         * Shows a message that will remain until `finished` is called on the object returned from wait.
         * @param {string} pendingMessage
         * @returns {{finished: finished, finishedMessage: finishedMessage}}
         */
		wait: function (pendingMessage) {
			var thisTimerId;

			ensureMessageEl();

			thisTimerId = setTimeout(function () {
				showMessage(pendingMessage, true, thisTimerId);
			}, feedbackThreshold);

			return {
                /**
                 * Closes the message shown with wait. If a message is provided, then that message will
                 * be shown after the wait message is hidden.
                 * @param {string=} [message]
                 */
				finished: function (message) {
					clearTimeout(thisTimerId);

					if (typeof message !== "string") {
						hideMessage(thisTimerId);
					} else {
						showMessage(message, false);
					}
				},

                /**
                 * curry for use with deferreds
                 * @param {string=} [message]
                 * @returns {function}
                 */
				finishedMessage: function (message) {
					var feedback = this;
					return function () {
						feedback.finished(message);
					};
				}
			};
		},

        /**
         * Kicks off the feedback timer and returns a function that can be used with a deferred
         * If the count is included, pending and completed should be objects with 'singular' and 'plural' properties.
         * @example someRepo.getSomeResource().then(message);
         * @param {string} pendingMsg
         * @param {string} finishedMsg
         * @param {number=} [count] - If the string has {{count}} in it, it will be replaced with the count variable.
         * @returns {function}
         */
		message: function (pendingMsg, finishedMsg, count) {
			return (count === void(0)) ?
				this.wait(pendingMsg).finishedMessage(finishedMsg) :
				this.wait(pluralize(pendingMsg, count)).finishedMessage(pluralize(finishedMsg, count));
		}
	};
}

appui.service("feedback", [
	"$",
	"timer",
	feedback
]);
