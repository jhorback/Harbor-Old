﻿/*
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
		create: function (bbextMVCoR) {
			return function (name, construct) {
				var proto = construct.prototype;

				proto.constructor = function () {
					var context = arguments[arguments.length - 1];

					// add name and context meta properties for future reference
					this.name = name;
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


context.module("bbext").service("bbext.mvcorConstruct", ["console", bbext.mvcorConstruct = mvcorConstruct]);
