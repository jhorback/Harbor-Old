
var appui = context.module("appui");


appui.register("window", function () {
	return window;
});


appui.service("console", ["window", function (window) {
	var console, winConsole, log;

	winConsole = window.console || {
		log: function () {
			window.alert(Array.prototype.slice.call(arguments, 0).join("\n"));
		}
	};
	
	log = function (type) {
		return function () {
			var args = Array.prototype.slice.call(arguments, 0),
			    consoleMethod;
			
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