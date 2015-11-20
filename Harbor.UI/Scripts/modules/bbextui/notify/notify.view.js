/*
 * notify.view extension
 *
 * usage:
 *    var viewNotification = notify.element(el);
 *    viewNotification.loading();
 *    viewNotification.finished();
 *    viewNotification.call.finished(); -> curried version
 *
 *    notify.view(view).ofModel(model);
 */
bbext.notifyView = function (notify, callbacks, console) {

	notify.extend(/** @mixin bbext.notifyElement */{

        /**
         * Creates a notify object configured to display on the specified element
         * @param el
         * @returns {{loading: Function, finished: Function, call:{loading: Function, finished:Function}}}
         */
		element: function (el) {
			var extension;

			el = $(el);

			extension = {
                /** displays a .notify-view-overlay element over the configured element, disables it, and lowers its opacity */
				loading: function () {
					var overlay = $('<div/>').css({
						    position: "absolute",
						    top: 0,
						    left: 0,
						    width: el.width(),
						    height: el.height()
					    }).addClass("notify-view-overlay"),
						position = el.css("position");

					if (position !== "relative" && position !== "absolute" && el[0].tagName.toUpperCase() !== "TR") {
						console.error("notify.view requires a relative or absolute positioned el. Position:", position, el);
					}

					el.append(overlay);
					el.attr("disabled", true);
					el.css("opacity", "0.6");
					return extension;
				},

                /** removes the overlay from the element, disables it, and restores its pre-notification opacity */
				finished: function () {
					el.find(".notify-view-overlay").remove();
					el.attr("disabled", false);
					el.css("opacity", "1");
				}
			};

			callbacks.create(extension, "loading", "finished");

			return extension;
		}
	});

	notify.extend(/** @mixin bbext.notifyView */{

        /**
         * Provides methods that automatically show notifications upon certain events and/or model flags.
         * @param {Backbone.View} view
         * @param {string|element|jquery=} [selector] - A selector, DOM element, or jQuery object on which the notification overlay should be placed
         */
		view: function(view, selector) {
			var notifyView;
            var getElFromElementSelectorOrJquery = function(selector) {
                if (_.isString(selector)) {
                    return view.$(selector);
                }
                if (_.isElement(selector)) {
                    return $(selector);
                }
                if (selector.jquery) {
                    return selector;
                }
                this.console.error('Selector must be a selector string, DOM element, or jQuery object, not whatever this is: ', selector);
            };
			return {
                /**
                 * Given a model that fetches/syncs with the server, configures a loading notification to be shown on
                 * 'fetch' events and hidden on 'sync' or 'error' events fired by that model.
                 * @param {Backbone.Model} model
                 * @example notify.view(myView).ofModel(myViewModel)
                 */
				ofModel: function(model) {
					view.listenTo(model, "request", function() {
						var el = selector ? getElFromElementSelectorOrJquery(selector) : view.$el;
						notifyView = notify.element(el);
						notifyView.loading();
					});

					view.listenTo(model, "sync error", function() {
						notifyView && notifyView.finished();
					});
				},

                /**
                 * Given a model that doesn't fetch/sync directly with the server, but does have a flag attribute
                 * that aliases/mimics server events, configures a loading notification to be shown when that flag
                 * is set to true, and hidden when that flag is set to false. Uses the "fetching" attribute by default.
                 * @param {Backbone.Model} model - the model with the flag attribute
                 * @param {string=} [flagName='fetching'] - the attribute to watch. Defaults to "fetching".
                 * @example notify.view(myView).ofModelFlag(myModel);
                 * @example notify.view(myView).ofModelFlag(myViewModel, 'saving');
                 */
                ofModelFlag: function(model, flagName) {
                    flagName = flagName || 'fetching';
                    var changeHandler = function(m, fetching) {
                        var el = selector ? getElFromElementSelectorOrJquery(selector) : view.$el;
                        if (fetching) {
                            notifyView = notify.element(el);
                            notifyView.loading();
                        } else {
                            notifyView && notifyView.finished();
                        }
                    };
                    model.get(flagName) && changeHandler(model, true);
                    view.listenTo(model, 'change:'+flagName, changeHandler);
				}
			}
		}
	});
};

bbext.config([
	"notify",
	"callbacks",
	"console",
	bbext.notifyView
]);
