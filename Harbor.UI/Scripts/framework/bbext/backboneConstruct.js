/*
 * backboneConstruct
 * 
 * Description:
 *    Can be used by a construct to create injected and mixed in Backbone objects.
 *    For example: Model, View, Collection, or Router; really any
 *    Backbone object that implements the Backbone .extend() method.
 *
 * Usage:
 *     myApp.construct("someCommonView", [
 *         "backboneConstruct", 
 *         "mixins",
 *          function (backboneConstruct, mixins) {
 *              var someCommonViewConstruct = mixins.mixin(Backbone.View.extend({}), ["defaultViewMixins", "someOtherMixin"])
 *              return backboneConstruct.createFrom(someCommonViewConstruct);
 *			}
 *      );
 *
 *      This enables:
 *      myApp.someCommonView("viewName", ...);
 */
function backboneConstruct(console, context, mixins) {
	"use strict";

	return {
		createFrom: function (backboneObj, callback) {

			return function (name, constructor) {
				var proto = constructor.prototype,
					construct;

				proto.constructor = function backboneConstruct () {
					var ret;
					
					// add name for future reference
					this.name = this.name ? this.name : name;
					ret = constructor.apply(this, arguments);
					ret = backboneObj.prototype.constructor.apply(this, arguments) || ret; // this is the wrapped version
					return ret;
				};

				construct = backboneObj.extend(proto, constructor);
				construct.prototype = mixins.mixin(construct.prototype);
				callback && callback(name, construct);
				return construct;
			};
		}
	};
};


context.module("bbext").service("backboneConstruct", [
	"console",
	"context",
	"mixins",
	bbext.backboneConstruct = backboneConstruct
]);
