
var appui = context.module("appui");


appui.register("window", function () {
	return window;
});


appui.register("location", function () {
	return window.location;
});


appui.register("document", function () {
	return window.document;
});


appui.service("console", ["window", function (window) {
	var console, winConsole, log,
	    okToLog = localStorage && localStorage.getItem("okToLog");

	winConsole = window.console || {
		log: function () {
			window.alert(Array.prototype.slice.call(arguments, 0).join("\n"));
		}
	};

	// jch* update this after researching a bit
	window.enableLog = function (enable) {
		okToLog = enable ? "yes" : "no";
		localStorage && localStorage.setItem("okToLog", okToLog);
		return "okToLog: " + okToLog;
	};

	log = function (type) {
		return function () {
			var args, consoleMethod;

			if (okToLog !== "yes") {
				return;
			}

			args = Array.prototype.slice.call(arguments, 0);
			type = winConsole[type] ? type : "log";
			consoleMethod = winConsole[type];
			consoleMethod.apply ? consoleMethod.apply(winConsole, args) : consoleMethod(args);
		};
	};

	console = {
		log: log("log"),
		warn: log("warn"),
		error: log("error"),
		debug: log("debug"),
		group: log("group"),
		groupEnd: log("groupEnd"),
		trace: trace
	};

	return console;

	function trace() {
		winConsole.trace ? winConsole.trace() : console.log("Client has no console.trace");
	}
}]);