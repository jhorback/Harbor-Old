/*
	gaService.sendEvent(options);
		Sends a click event using google analytics.
	
	options:
		category - the main identifier for the event, typically the object that was interacted with.
		label - optional additional identifier, useful for further categorization.
		value - optional number, useful to pass counts (e.g. 4 times).

	Note: The analytics.js script is in the html document header which provides the global ga sympbol.
*/
function gaService(console) {
	return {
		sendEvent: function (options) {
			options = _.extend(options, {action: "click"});
			console && console.info && console.info("gaService.sendEvent", options);
			ga && ga("send", "event", options.category, options.action, options.label, options.value);
		}
	};
}
module("appui").service("gaService", ["console", gaService]);




/*
	A shim to attach data-track markup to gaService.sendEvent
*/
function gaSendEventShim (nameValueParser, gaService) {
	this.nameValueParser = nameValueParser;
	this.gaService = gaService;
}

gaSendEventShim.prototype = {
	selector: "[data-track]",

	render: function (el, model, matches) {
		var parser = this.nameValueParser,
		    gaService = this.gaService;

		$(el).delegate("[data-track]", "click", function (event) {
			var target = $(event.target),
			    eventOptions = parser.parse(target.data("track"), "category"); // category is the default
			gaService.sendEvent(eventOptions);
		});
	}
};

appui.shim("gaSendEventShim", [
	"nameValueParser",
	"gaService",
	gaSendEventShim
]);