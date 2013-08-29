
var appui = context.module("appui");


appui.register("window", function () {
	return window;
});


appui.service("console", ["window", function (window) {
	var console, winConsole, log, okToLog = true;
	
	// jch* testing various ways of turing the log on
	window.log = function () {
		okToLog = true;
		return "logging is on";
	};
	
	if (!okToLog) {
		okToLog = window.location.search.indexOf("log=") > -1;
	}

	winConsole = window.console || {
		log: function () {
			window.alert(Array.prototype.slice.call(arguments, 0).join("\n"));
		}
	};
	
	log = function (type) {
		return function () {
			var args, consoleMethod;
			
			if (!okToLog) {
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