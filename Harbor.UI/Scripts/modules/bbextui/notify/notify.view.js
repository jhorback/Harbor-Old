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

	notify.extend({
		element: function (el) {
			var extension;

			el = $(el);

			extension = {
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
						console.error("notify.view requires a relative or absolute positioned el. Position:" + position);
					}
					
					el.append(overlay);
					el.attr("disabled", true);
					el.css("opacity", "0.6");
					return extension;
				},

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

	notify.extend({
		view: function(view, selector) {
			var notifyView;
			return {
				ofModel: function(model) {
					view.listenTo(model, "request", function() {
						var el = selector ? view.$(selector) : view.$el;
						notifyView = notify.element(el);
						notifyView.loading();
					});

					view.listenTo(model, "sync error", function() {
						notifyView && notifyView.finished();
					});
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