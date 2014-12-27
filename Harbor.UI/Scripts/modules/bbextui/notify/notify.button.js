

bbext.notifyButton = function (notify, callbacks) {

	notify.extend({
		button: function (el) {
			var extension;

			el = $(el);

			extension = {
				disable: function (text) {

					el.attr("disabled", true);

					if (text) {
						el.data("previousText", el.html());
						el.html(text);
					}

					return extension;
				},

				enable: function (text) {
					var previousText = text || el.data("previousText");

					el.attr("disabled", false);

					if (previousText) {
						el.html(previousText);
					}
				}
			};

			callbacks.create(extension, "enable");

			return extension;
		}
	});
};

bbext.config([
	"notify",
	"callbacks",
	bbext.notifyButton
]);