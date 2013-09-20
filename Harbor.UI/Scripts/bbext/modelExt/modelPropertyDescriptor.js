

// jch! I like this - make sure the get/set/bind/validate uses these
function modelPropertyDescriptor(model) {

	// may test for $.isPlainObject 
	
	return {
		get: descriptor("get"),
		set: descriptor("set"),
		bind: descriptor("bind"),
		validate: descriptor("validate")
	};

	function descriptor(descriptorName) {
		return function (propertyName) {
			var safeName = "[" + propertyName + "]",
			desc;
			desc = model[safeName] || model[propertyName];
			return desc && desc[descriptorName];
		};
	}
}

bbext.register("modelPropertyDescriptor", modelPropertyDescriptor, "function");