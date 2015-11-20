
/*
 * eventBinder - shim [data-event]
 *     A shim used to add data-event="eventName: methodName, ..." attribute
 *     to the Backbone events on the view.
 *
 *     model argument - the model in context will also be passed as the last 
 *         argument to the event function (the first argument being the event object)
 */
bbext.eventBinderShim = function (nameValueParser, console) {

    return {
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
                if (parentView) {
                    this.attachEvents(parentView, matches, view.model);
                } else if (el.length > 0) {
                    console.warn('No parent view found when resolving events! Current view: %o, model: %o, matches:', view, model, matches);
                }
            }
        },

        attachEvents: function (view, matches, model) {
            var bbEvents = {},
				thisShim = this;

            matches.each(function (i, evEl) {
                var dataEvent, evs, selector;

                evEl = $(evEl);
                dataEvent = evEl.data("event");
                evs = nameValueParser.parse(dataEvent, "click");
                selector = "[data-event='" + dataEvent + "']";

                $.each(evs, function (name, value) {
                    var fn = view[value],
						scoped = $.trim(name);

                    // curry the callback function so it can include the views model
                    if (fn && !fn.curried) {
                        // If there's a space then it's already scoped to some selector (e.g. 'click li')
                        scoped = (name.indexOf(' ') !== -1) ? name : name + ' ' + selector;
                        bbEvents[scoped] = value;
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
            return function (event, otherArgs) {
                var args = Array.prototype.slice.apply(arguments),
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
};

bbext.shim("eventBinderShim", [
	"nameValueParser",
	"console",
	bbext.eventBinderShim
]);
