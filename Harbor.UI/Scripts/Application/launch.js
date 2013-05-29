/*
 * launch.construct(name, creator);
 *     Adds a symbol to launch which can be used to compose and register objects.
 * 
 *     launch.construct("foo", function *() 

 */

var launch = (function () {

	var launch, ext;
	
	launch = function (appName) { // jch! - is this right? test
		var app = launch.get(appName);
		app.start();
		return app;
	};

	ext = {
		mixin: function (destination, source) {
			/// <summary>
			/// A simple single level extension method for mixins
			/// </summary>
			for (var k in source) {
				if (source.hasOwnProperty(k)) {
					destination[k] = source[k];
				}
			}
			return destination;
		},
		
		construct: function (constructName, creator) {
			var scope = this;

			this[constructName] = function (name, construct, proto, statics) {
				var retFn, protoObj;

				ext.mixin(construct.prototype, proto);
				ext.mixin(construct, statics);

				retFn = launch.call(creator, [], scope);
				protoObj = retFn.apply(scope, [construct]);
				if (!protoObj) {
					throw new Error("The inner construct function did not return anything.");
				}
				scope.register(name, protoObj);
				return protoObj;
			};
		}
	};
	

	// add the extension to the launch function to expose the methods
	ext.mixin(launch, ext);
	ext.mixin(launch, IOC); // adds register, get, and call functions
	return launch;

}());