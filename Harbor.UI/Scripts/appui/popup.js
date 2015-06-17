var popupFactory = (function ($, window) {
	/*
	Requires jQuery and jQuery.ui.position

	JavaScript options:
		title - the title of the popup
		placement - top, right, bottom, left (or an object defining the position options i.e. my, at, etc.)
		anchor - a selector or node to anchor the popup
		container - a selector or node to append the popup to. If null, the popup will be placed after its anchor.
		animate - Set to false to turn off the fade animation.
		onHide - a callback called when the hide method is called.

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
			// this.position();
			if (this.options.animate) {
				this.popupEl.fadeIn(_.bind(function() {
					this.showAndPosition(onShow);
				}, this));
			} else { 
				this.showAndPosition(onShow);
			}
		},

		showAndPosition: function(onShow) {
			this.popupEl.show();
			onShow && onShow();
			this.position();
		},
		
		hide: function (onHide) {
			var el = this.el;

			//if (this.options.animate) {
			//	this.popupEl.fadeOut(function () {
			//		el.trigger("hide");
			//		onHide && onHide();
			//	});
			//} else {
				this.popupEl.hide();
				onHide && onHide();
				this.options.onHide && this.options.onHide();
			//}
		},
		
		destroy: function () {
			var self = this;
			this.hide(function () {
				win.unbind(".popup");
				doc.unbind(".popup");
				self.el.remove();
				self.popupEl.remove();
			});
		},

		position: function () {
			privates.position.call(this);
		},

		close: function () {
			this.destroy();
		}
	};


	Popup.defaultOptions = {
		placement: "top",
		animate: true,
		autoShow: true
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
			this.options.autoShow && this.show();
		},
		
		render: function () {
			this.popupEl = $($.parseHTML(Popup.template));
			this.popupEl.addClass(this.options.placement);
			if (this.options.title) {
				this.popupEl.find(".popup-title").html(this.options.title);
			} else {
				this.popupEl.find(".popup-title").remove();
			}
			this.popupEl.find(".popup-content").append(this.el.detach().show());
			// console.log(this.options.container);
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
					"right":  { my: "left center",   at: "right+10 center"  },
					"bottomleft": { my: "right+102 top",    at: "center bottom+10" }
				},
			    position = placement[this.options.placement] || placement;
			
			position.of = this.anchor;
			position.collision = "none";
			if (this.options.container) {
				position.within = this.options.container;
			}

			// jQuery UI does not support positioning hidden elements.
			if (this.popupEl.is(":hidden")) {
				this.popupEl.show();
				this.popupEl.position(position);
				this.popupEl.hide();
			} else {
				this.popupEl.position(position);
			}
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