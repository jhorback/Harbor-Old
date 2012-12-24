/*globals window, document, clearTimeout, setTimeout, jQuery*/
/*
 * ui.message.js v1.0.2
 *     modified for jslint
 */
/*
 * Description:
 *     A simple message widget.
 *
 * Markup:
 *     Style this markup in whatever way suits.
 *     The message div will be put inside the #message-text element.
 *     <div id="message"><div id="message-text"></div></div>
 * 
 * Options:
 *     closeText - the text show on the message close link (set to falsy to not show a close link).
 *     timer - the number of seconds to show the message for before it hides itself (set to falsy to keep from auto hiding).
 * 
 *     When hide is called, the original element will be removed from the dom.
 *
 * Depends:
 *	   jquery.ui.widget.js
 */
(function ($, window) {

	var openMessageEl;

	$.widget("ui.message", {
		
		_timeoutID: null,
		_messageDiv: null,
		_messageTextSpan: null,

		options: {
			closeText: "OK",
			timer: 20
		},
		
		_create: function () {	

			this._messageDiv = $('<div id="message"><span id="message-text"></span></div>')
				.appendTo(document.body).hide();

			// auto show
			this.show();
		},
		
		_appendElement: function () {
			var closeLink, hide;

			this._messageDiv.hide().find("#message-text").append(this.element);
			
			if (this.options.closeText) {
				closeLink = $('<a href="#" class="message-close"/>').html(this.options.closeText);
				this.element.append(" ").append(closeLink);
				hide = $.proxy(this.hide, this);
				closeLink.click(function (event) {
					event.preventDefault();
					hide();
				});
			}
		},

		show: function () {
			var fadeIn = function () {
				openMessageEl = this.element;
				this._appendElement();
				this._messageDiv.fadeIn();
			};

			clearTimeout(this._timeoutID);

			// if message is visible, hide then show
			if (openMessageEl) {
				openMessageEl.bind("messagedestroy", $.proxy(fadeIn, this));
				openMessageEl.message("hide"); // will trigger messagedestroy
			} else {
				fadeIn.call(this);
			}

			if (this.options.timer) {
				this._timeoutID = setTimeout($.proxy(this.hide, this), this.options.timer * 1000);
			}
		},

		hide: function () {
			clearTimeout(this._timeoutID);
			this._messageDiv.fadeOut($.proxy(this.destroy, this));
		},

		destroy: function () {
			openMessageEl = null;
			this._trigger("destroy");
			$.Widget.prototype.destroy.call(this);
			this.element.closest("#message").remove();
		}
	});
}(jQuery, window));