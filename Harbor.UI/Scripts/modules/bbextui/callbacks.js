/*
 * Creates a 'call' object on the context and provides curried versions
 *     of each of the specified methods.
 * 
 * this.callbacks.create(this, "update", "close");
 * this.get(...).then(this.call.update()).fail(this.call.close());
 */
bbext.callbacks = function () {
	return {
		create: function (context, methodNames) {
			methodNames = Array.prototype.slice.apply(arguments);
			methodNames.shift();
			context.call = {};
			_.each(methodNames, function (methodName) {
				context.call[methodName] = function () {
					var args = Array.prototype.slice.apply(arguments);
					return function () {
						context[methodName].apply(context, args);
					}
				};
			});
		}
	};
};

bbext.service("callbacks", bbext.callbacks)