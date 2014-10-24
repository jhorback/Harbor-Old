/** @module appui */
var appui = context.module("appui");

/**
 * An injectable reference to the window object
 * @name appui.window
 */
appui.register("window", function () {
	return window;
});

/**
 * An injectable reference to window.location
 * @name appui.location
 */
appui.register("location", function () {
	return window.location;
});

/**
 * An injectable reference to the document object (window.document)
 * @name appui.document
 */
appui.register("document", function () {
	return window.document;
});

/**
 * An injectable console interface that supports logging to local storage. Adds an
 * `enableLog(enable)` method to the window object to enable logging through the
 * browser console.
 * @name appui.console
 * @augments window
 */
appui.service("console", ["window", function (window) {
	var console, winConsole, log,
	    okToLog = localStorage && localStorage.getItem("okToLog");

	winConsole = window.console || {
		log: function () {
			window.alert(Array.prototype.slice.call(arguments, 0).join("\n"));
		}
	};

	// jch* update this after researching a bit
    /**
     * Turns logging to local storage on and off. Returns a string that says whether
     * okToLog is set to true or false.
     * @param {boolean} enable
     * @returns {string}
     * @name window.enableLog
     */
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
		info: log("info"),
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
