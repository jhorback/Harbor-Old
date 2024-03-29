﻿/*!
* Dialog.js
*/
/*
* Description:
*     Wraps an element in a dialog with a few options for configuration.
* 
* Requires:
*     jquery.ui.position.js
*     jquery.ui.draggable.js (optional)
*
* Options:
*     title
*     transition - "none", "fade", "slide"
*     modal - default is false
*     draggable - default is true (if jquery.ui.draggable exists)
*     position - jquery.ui.position options (the default is center of the window).
*     editorFor - An element that is being edited by the dialog (sets modal to true, draggable to false, and handles the positioning).
*
* Dialog close attribute
*     Any element with a data-rel attribute set to back ([data-rel=back]) will
*     close the dialog when clicked.
*/
(function ($) {
	var Dialog, win, doc;

	win = $(window);
	doc = $(document);

	Dialog = function (el, options) {
		if (this instanceof Dialog === false) {
			return new Dialog(el, options);
		}

		this.element = $(el);
		this.dialogEl = null;
		this.overlay = null;
		this.options = $.extend({}, Dialog.defaultOptions, options);
		this.events = [];

		if (this.options.editorFor) {
			$.extend(this.options, {
				modal: true,
				draggable: false, 
				position: {
					my: "center",
					at: "center",
					of: this.options.editorFor,
					offset: "0 0"	
				}
			});
		}

		this.init();
		return this;
	};

	Dialog.prototype = {
		init: function () {
			var self = this;

			win.bind("resize.dialog", function () {
				self.position();
			});

			doc.bind("keydown.dialog", function (event) {
				// 27 - escape key
				if (event.which == 27) { //ignore jslint - event.which requires coersion
					self.close();
				}
			});

			this.render()
				.bind(".dialog-close", "click", "close")
				.bind("[data-rel=back]", "click", "close");
			this.show();
		},

		render: function () {
			var self = this;

			this.dialogEl = $(Dialog.template);
			this.dialogEl.find("h1").html(this.options.title);
			this.dialogEl.find(".dialog-content").append(this.element.show());
			doc.find("body").append(this.dialogEl.hide());
			this.position();
			if (this.options.draggable && $.fn.draggable) {
				this.dialogEl.draggable({
					handle: ".dialog-header"
				}); //.find("h1").css("cursor", "move");
			}

			setTimeout(function () {
				self.element.find("[autofocus]").focus();
			}, 100);
			return this;
		},

		bind: function (selector, event, method) {
			var el = this.dialogEl.find(selector);

			method = $.proxy(this[method], this);
			this.events.push({ el: el, event: event, method: method });
			el.bind(event, method);
			return this;
		},

		position: function () {
			var dlg = this.dialogEl;

			dlg.position(this.options.position);

			// make sure the top and left positions are within the viewport
			// tried to use collision for this but could not get it to work
			setTimeout(function () {
				var dcCss = {};
				var dcPos = dlg.position();

				if (dcPos.top < 0) {
					dcCss["top"] = 0;
				} if (dcPos.left < 0) {
					dcCss["left"] = 0;
				}

				// only reset the position if necessary to reduce a reflow
				if (dcCss.top !== undefined || dcCss.left !== undefined) {
					dlg.css(dcCss);
				}
			}, 0);
		},

		show: function () {
			this._transition(this.dialogEl, true);
			if (this.options.modal && !this.overlay) {
				this.overlay = $(Dialog.overlayTemplate);
				doc.find("body").append(this.overlay);
				this._transition(this.overlay, true);
			}
		},

		_transition: function (el, show, callback) {
			var methods = {
				"fade": function () {
					show ? el.fadeIn(callback) : el.fadeOut(callback);
				},
				"slide": function () {
					show ? el.slideDown(callback) : el.slideUp(callback);
				},
				"none": function () {
					show ? el.show() : el.hide();
					callback && callback.call();
				}
			};
			if (!el) {
				return;
			}
			methods[this.options.transition.toLowerCase()].call();
		},

		close: function (callback) {
			var self = this,
				destroyProxy = function () {
					_.isFunction(callback) && callback();
					$.proxy(self.destroy, self)();
				};
			this.element.trigger("close");
			this._transition(this.dialogEl, false, destroyProxy);
			this._transition(this.overlay, false, destroyProxy);
		},

		destroy: function () {
			var i, boundEvent;

			if (this._removed) {
				return;
			}
			this._removed = true;

			win.unbind(".dialog");
			doc.unbind(".dialog");

			// unbind events bound with this.bind(...)
			i = this.events.length;
			while (i--) {
				boundEvent = this.events[i];
				boundEvent.el.unbind(boundEvent.event, boundEvent.method);
			}

			this.element.remove();
			this.dialogEl.remove();
			this.overlay && this.overlay.remove();
		}
	};

	Dialog.defaultOptions = {
		title: "",
		transition: "none",
		modal: false,
		draggable: true,
		position: {
			my: "center",
			at: "center",
			of: win,
			offset: "0 -50"
		},
		editorFor: null
	};

	Dialog.template = '' +
		'<div class="dialog-wrapper">' +
		'	<div class="dialog">' +
		'		<div class="dialog-header">' +
		'			<h1></h1>' +
		'			<span data-rel="back" title="close" class="dialog-close">&#9447;</a>' +
		'		</div>' +
		'		<div class="dialog-content"><!--dialog element is placed here--></div>' +
		'	</div>' +
		'</div>';

	Dialog.overlayTemplate = '<div class="overlay"/>';

	window.Dialog = Dialog;


} (jQuery));