

module("appui").service("deprecate", ["console", function (console) {
	return {
		mute: false, 
			
		log: function (msg) {
			if (!this.mute) {
				msg = msg ? msg : "";
				console.warn("Method has been deprecated.", msg);
				console.trace();
			}
		}
	};
}]);