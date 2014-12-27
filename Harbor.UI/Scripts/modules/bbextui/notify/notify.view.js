
// jch! - what is a better way to extend notify rather than on startup?
// add documentation to both scripts
bbext.notifyView = function (notify, callbacks) {

	notify.extend({
		view: function (el) {
			var extension;

			el = $(el);

			extension = {
				loading: function (text) {
					var overlay = $('<div/>').css({
						position: "absolute",
						top: 0,
						left: 0,
						width: el.width(),
						height: el.height(),
						background: "#ccc",
						opacity: "0.5"
					}).addClass("notify-view-overlay");


					el.css("position", "relative"); // could do a test and warn if not relative or absolute
					el.attr("disabled", true);
					el.append(overlay);

					return extension;
				},

				finished: function (text) {
					el.find(".notify-view-overlay").remove();
					el.attr("disabled", false);
				}
			};

			callbacks.create(extension, "finished");

			return extension;
		}
	});
};

bbext.config([
	"notify",
	"callbacks",
	bbext.notifyView
]);