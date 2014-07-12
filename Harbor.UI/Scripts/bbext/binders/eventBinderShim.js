
/* 
 * eventBinder - shim [data-event]
 *     A shim used to add data-event="eventName: methodName, ..." attribute
 *     to the Backbone events on the view.
 *
 *     model argument - the model in context will also be passed as a second
 *         argument to the event function (the first argument being the event object)
 */
function eventBinderShim($, nameValueParser) {
	this.$ = $;
	this.nameValueParser = nameValueParser;
};
	

eventBinderShim.prototype = {
	selector: "[data-event]",
	render: function (el, model, matches) {
		var view = el.data("view");
	
		if (view) {
			this.attachEvents(view, matches, model);
		}
	},

	resolve: function (el, model, matches) {
		var view = el.data("view"),
		    parentView;

		// if we are a generic view, look for the first named view to attach events on
		if (view && view.name.indexOf("g-view") === 0) {
			el = view.$el.closest("[data-templatefrom]:not([data-templatefrom^='g-view'])");
			parentView = el.data("view");
			this.attachEvents(parentView, matches, view.model);
		}
	},

	attachEvents: function (view, matches, model) {
		var bbEvents = {},
			$ = this.$,
		    nameValueParser = this.nameValueParser,
			thisShim = this;

		matches.each(function (i, evEl) {
			var dataEvent, evs, selector;

			evEl = $(evEl);
			dataEvent = evEl.data("event");
			evs = nameValueParser.parse(dataEvent, "click");
			selector = "[data-event='" + dataEvent + "']";

			$.each(evs, function (name, value) {
				var fn = view[value];
				
				// curry the callback function so it can include the views model
				if (fn && !fn.curried) {
					bbEvents[name + " " + selector] = value;
					view[value] = thisShim.delegateCurry(fn);
					view[value].curried = true;
				}
			});
		});

		view.events = view.events || {}; // make sure there is an events object
		$.extend(view.events, bbEvents);
		view.delegateEvents();
	},

	delegateCurry: function (delegate) {
		return function (event) {
			var args = [event],
				view;
			if (event) {
				view = this.$(event.target).closest("[data-templatefrom]").data("view");
				if (view) {
					args.push(view.model);
				}
			}
			delegate.apply(this, args);
		};
	}
};

context.module("bbext").shim("eventBinderShim", ["$", "nameValueParser", bbext.eventBinderShim = eventBinderShim]);