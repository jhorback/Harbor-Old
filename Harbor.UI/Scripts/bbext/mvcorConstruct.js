/*
 * viewAndModelConstruct
 * 
 * Description:
 *    Can be used by a construct to create versions for a Backbone
 *    Model, View, Collection, or Router.
 *    Similar to the factories, this code has been extracted to keep things dry.
 *    Properties name and context are added to each view instance before the constructor is called.
 */
function mvcorConstruct(console, context) {

	return {
		create: function (bbextMVCoR) {
			return function (name, construct) {
				var proto = construct.prototype;

				proto.constructor = function () {

					// add name and context meta properties for future reference
					this.name = this.name ? this.name : name;
					this.context = context;

					// inject the constructor
					if (context.call) {
						context.call(construct, arguments, this);
					} else {
						construct.apply(this, arguments);
					}
					
					bbextMVCoR.prototype.constructor.apply(this, arguments);
					return this;
				};

				return bbextMVCoR.extend(proto, construct);
			};
		}
	};
};


context.module("bbext").service("bbext.mvcorConstruct", [
	"console",
	"context",
	bbext.mvcorConstruct = mvcorConstruct
]);
