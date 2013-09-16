var popupFactory = (function ($, window) {
	/*
	Requires jQuery and jQuery.ui.position

	JavaScript options:
		title - the title of the popup
		placement - top, right, bottom, left
		anchor - a selector or node to anchor the popup
		container - a selector or node to append the popup to. If null, the popup will be placed after its anchor.
		animate - Set to false to turn off the fade animation.

	Markup options:
	<div data-placement="top" data-title="Popup Title">
		<h1>Popup Title as H1</h1>
	</div>
	*/

	var Popup, privates, win, doc;

	win = $(window);
	doc = $(window.document);

	Popup = function (el, options) {
		var titleEl;

		this.el = $(el);
		this.popupEl = null;
		this.options = $.extend({}, Popup.defaultOptions, el.data(), options);
		this.anchor = $(this.options.anchor);
		if (this.anchor.length === 0) {
			throw new Error("An anchor was not specified for the popup.");
		}
		if (!this.options.title) {
			titleEl = el.find("h1");
			this.options.title = titleEl.html();
			titleEl.remove();
		}
		
		privates.init.call(this, el, options);
	};


	Popup.prototype = {		
		show: function (onShow) {
			if (this.animate) {
				this.popupEl.fadeIn(onShow);
			} else {
				this.popupEl.show();
				onShow && onShow();
			}
		},
		
		hide: function (onHide) {
			var el = this.el;

			if (this.animate) {
				this.popupEl.fadeOut(function () {
					el.trigger("hide");
					onHide && onHide();
				});
			} else {
				this.popupEl.hide();
				onHide && onHide();
			}
		},
		
		destroy: function () {
			var self = this;
			this.hide(function () {
				win.unbind(".popup");
				doc.unbind(".popup");
				self.el.remove();
				self.popupEl.remove();
			});
		}
	};


	Popup.defaultOptions = {
		placement: "top",
		animate: true
	};

	Popup.template = '' +
		'<div class="popup">' +
		'	<div class="arrow"></div>' +
		'	<h1 class="popup-title"></h1>' +
		'	<div class="popup-content"></div>' +
		'</div>';

	privates = {		
		init: function () {
			var self = this;
			
			//win.bind("resize.popup", function () {
			//	privates.position.call(self);
			//});

			//setTimeout(function () {
			//	doc.bind("click.popup", function (event) {
			//		var target = $(event.target);
			//		if (target.closest(".popup").length === 0 && target[0] !== self.options.anchor[0]) {
			//			self.hide();
			//		}
			//	});
			//}, 0);

			privates.render.call(this);
			this.show();
		},
		
		render: function () {
			this.popupEl = $($.parseHTML(Popup.template));
			this.popupEl.addClass(this.options.placement);
			this.popupEl.find(".popup-title").html(this.options.title);
			this.popupEl.find(".popup-content").append(this.el.detach().show());
			console.log(this.options.container);
			if (this.options.container) {
				$(this.options.container).append(this.popupEl);
			} else {
				this.anchor.after(this.popupEl);
			}
			privates.position.call(this);
		},
		
		position: function () {
			var placement = {
					"top":    { my: "center bottom", at: "center top-10"    },
					"bottom": { my: "center top",    at: "center bottom+10" },
					"left":   { my: "right center",  at: "left-10 center"   },
					"right":  { my: "left center",   at: "right+10 center"  }
				},
			    position = placement[this.options.placement];
			
			position.of = this.anchor;
			position.collision = "none";
			if (this.options.container) {
				position.within = this.options.container;
			}

			// jQuery UI does not support positioning hidden elements.
			this.popupEl.show();
			this.popupEl.position(position);
			this.popupEl.hide();
		}
	};

	window.Popup = Popup;

	return {
		create: function (el, options) {
			return new Popup(el, options);
		}
	};

});


appui.service("popupFactory", ["$", "window", popupFactory]);