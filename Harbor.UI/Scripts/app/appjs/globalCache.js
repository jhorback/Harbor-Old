
module("appjs").service("globalCache", ["globals" ,function (globals) {
	return {
		get: function (name) {
			return globals[name];
		},
		set: function (name, value) {
			globals[name] = value;
		}
	};
}]);