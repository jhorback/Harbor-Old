/*
 * viewAndModelConstruct
 * 
 * Description:
 *    Can be used by a construct to create versions for a Backbone
 *    Model, View, Collection, or Router.
 *    Similar to the factories, this code has been extracted to keep things dry.
 *    Properties name and context are added to each view instance before the constructor is called.
 */
function mvcorConstruct(console) {

	return {
		create: function (MVCoR, bbextMVCoR, constructorCallback) {
			return function (construct, name) {
				var protoProps = construct.prototype;
				
				protoProps.constructor = construct;
				if (protoProps.constructor) {
					protoProps._ctor = protoProps.constructor;
				}

				protoProps.constructor = function () {
					var context = arguments[arguments.length - 1];

					if (this.$inject && this.$inject[0] !== "options") {
						console.warn("First argument is not options of : " + name);
					}

					// add name and context meta properties for future reference
					this.name = name;
					this.context = context;
					

					// inject the constructor
					if (context.call) {
							context.call(this._ctor, arguments, this);
					} else {
						this._ctor.apply(this, arguments);
					}
					
					constructorCallback && constructorCallback.apply(this, arguments);

					MVCoR.apply(this, arguments);
					

					return this;
				};

				return bbextMVCoR.extend(protoProps, construct);
			};
		}
	};
};


context.module("bbext").service("bbext.mvcorConstruct", ["console", bbext.mvcorConstruct = mvcorConstruct]);
