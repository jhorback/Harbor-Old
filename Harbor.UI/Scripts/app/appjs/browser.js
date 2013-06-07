
var appjs = module("appjs");


appjs.register("window", function () {
	return window;
});


appjs.service("console", ["window", function (window) {
	var console, log;

	console = window.console || {
		log: function () {
			window.alert(Array.prototype.slice.call(arguments, 0).join("\n"));
		}
	};
	
	log = function (type) {
		return function () {
			type = console[type] ? type : "log";
			console[type].apply(null, arguments);
		};
	};
	
	return {
		log: log("log"),
		warn: log("warn"),
		error: log("error")
	};
}]);