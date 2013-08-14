/*
 * viewAndModelConstruct
 * 
 * Description:
 *    Can be used by a construct to create versions for a Backbone
 *    Model, View, Collection, or Router.
 *    Similar to the factories, this code has been extracted to keep things dry.
 */
context.module("bbext").service("bbext.mvcorConstruct", function () {

	return {
		create: function (MVCoR, bbextMVCoR) {
			return function (construct, name) {
				var protoProps = construct.prototype;

				// add the name of the View/Model as a property for reference.
				protoProps.name = name;

				protoProps.constructor = construct;
				if (protoProps.constructor) {
					protoProps._ctor = protoProps.constructor;
				}

				protoProps.constructor = function () {
					var context = arguments[arguments.length - 1];

					if (this.$inject && this.$inject[0] !== "options") {
						console.warn("First argument is not options of : " + name);
					}

					// inject the constructor
					if (this._ctor) {
						context.call(this._ctor, arguments, this);
					}

					MVCoR.apply(this, arguments);
					return this;
				};

				return bbextMVCoR.extend(protoProps, construct);
			};
		}
	};
});
