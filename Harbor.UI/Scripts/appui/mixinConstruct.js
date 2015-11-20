/*
	Uses the combine mixin pattern for composition.
	Not to be confused with the mixins service which is used to 
	add additional functionality.
*/
appui.mixinConstruct = function (context, mixins) {
	"use strict";

	return {
		createFrom: function (Parent) {

			return function (name, construct) {

				var constructor = function () {
					this.name = name;
					context.call(Parent, [], this);
					context.call(construct.prototype.constructor, [], this); // potentially wrapped constructor
				};

				constructor.prototype = _.extend({}, Parent.prototype, construct.prototype);
				mixins.mixin(constructor.prototype);
				return constructor;
			};
		}
	};
}

appui.service("mixinConstruct", [
	"context",
	"mixins",
	appui.mixinConstruct
]);