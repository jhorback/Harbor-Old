/*!
 * Menu.js
 */
/*
 * Description:
 *     Wraps an element in a menu with a few options for configuration.
 *     The menu manages closing and only allows a single context menu to appear
 *     at any given time.
 *
 * Requires:
 *     jQuery
 *
 * Options:
 *     transition - "none", "fade", "slide",
 *     anchor - element to position the menu against.
 *     close - a callback when the menu closes.
 *     container - A selector or node to place the menu. If null, it will be placed in the body.
 *     showCloseIcon - Shows an close icon in the menu if true. Default is false.template
 *         Setting a data-rel="close" attribute will close the menu when clicking that element.
 *
 */
(function ($) {
	var Menu, win, doc;

	win = $(window);
	doc = $(document);

	Menu = function (el, options) {
		var menu;

		if (this instanceof Menu === false) {
			return new Menu(el, options);
		}

		this.position = $.proxy(this.position, this);
		this.close = $.proxy(this.close, this);
		this._closeOnEscape = $.proxy(this._closeOnEscape, this);
		this._testForClose = $.proxy(this._testForClose, this);


		this.options = $.extend({}, Menu.defaultOptions, options);
		this.options.anchor = $(this.options.anchor);
		menu = this.options.anchor.data("_menu");
		if (menu) {
			menu.close();
			return this;
		}

		this.element = $(el);
		this.options.anchor.data("_menu", this);
		this.menuEl = null;
		this.events = [];
		this.init();
		return this;
	};

	Menu.prototype = {
		init: function () {

			win.bind("resize", this.position);
			doc.bind("keydown", this._closeOnEscape);

			setTimeout(_.bind(function () { // yield so the current click event does not close the menu
				doc.bind("click", this._testForClose);
			}, this), 0);

			this.render();
			this.menuEl.find("[data-rel=close]").click(this.close);
		},

		_closeOnEscape: function (event) {
			// 27 - escape key
			if (event.which == 27) { //ignore jslint - event.which requires coersion
				this.close();
			}
		},

		_testForClose: function (event) {
			var target = $(event.target);
			if (target.is(":visible") &&
				//target.closest(".menu").length === 0 &&
				this.menuEl.is(":visible")) {
				this.close();
			}
		},

		render: function () {
			var frag, container;

			frag = $.parseHTML(Menu.template);
			container = this.options.container ? $(this.options.container) : doc.find("body");
			this.menuEl = $(frag);
			if (!this.options.showCloseIcon) {
				this.menuEl.find(".menu-close").remove();
			}
			this.menuEl.find(".menu-content").append(this.element.detach());
			container.append(this.menuEl.hide());
			this.show();

			return this;
		},

		position: function () {
			var menu = this.menuEl,
			    el = this.element,
				o = this.options;

			// make sure the top and left positions are within the viewport
			// tried to use collision for this but could not get it to work
			setTimeout(function () {
				var dcCss = {},
					dcPos,
					isHidden = !menu.is(":visible");

				isHidden && menu.show();
				if (o.anchor.length === 0) {
					return;
				}

				menu.position({
					my: "left top",
					at: "left bottom",
					of: o.anchor
					//offset: "0 0"
				});

				dcPos = menu.position();
				if (dcPos.top < 0) {
					dcCss["top"] = 0;
				} if (dcPos.left < 0) {
					dcCss["left"] = 0;
				}

				// only reset the position if necessary to reduce a reflow
				if (dcCss.top !== undefined || dcCss.left !== undefined) {
					menu.css(dcCss);
				}

				// ensure the elements width for ie 9+
				el.width(el.children().eq(0).width());
				isHidden && menu.hide();
			}, 0);
		},

		show: function () {
			this.options.anchor.addClass("open");
			this._transition(this.menuEl, true);
			return this;
		},

		_transition: function (el, show, callback) {
			var methods = {
				"fade": function () {
					show ? el.fadeIn(callback) : el.fadeOut(callback);
				},
				"slide": function () {
					show ? el.slideDown("fast", callback) : el.slideUp("fast", callback);
				},
				"none": function () {
					show ? el.show() : el.hide();
					callback && callback.call();
				}
			};
			if (!el) {
				return;
			}

			this.position();
			methods[this.options.transition.toLowerCase()].call();
		},

		close: function (callback) {
			var self = this,
				destroyProxy = function () {
					_.isFunction(callback) && callback();
					$.proxy(self.destroy, self)();
				};
			this._transition(this.menuEl, false, destroyProxy);
		},

		destroy: function () {
			if (this._removed) {
				return;
			}
			this._removed = true;

			win.unbind("resize", this.position);
			doc.unbind("keydown", this._closeOnEscape);
			doc.unbind("click", this._testForClose);

			this.element.trigger("menuclose");
			this.element.remove();
			this.menuEl.remove();
			this.options.close && this.options.close();
			this.options.anchor.removeClass("open");
			this.options.anchor.data("_menu", null);
		}
	};

	Menu.defaultOptions = {
		transition: "none"
	};

	Menu.template = '' +
		'<div class="menu">' +
		'	<div class="menu-content"><!--menu element is placed here--></div>' +
		'	<div data-rel="close" title="close" class="menu-close">&times;</div>' +
		'</div>';

	window.Menu = Menu;


}(jQuery));
