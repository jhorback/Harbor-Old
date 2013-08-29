/*
Uses the combine mixin pattern for composition.
Base one object off of another while executing each constructor and mixing each prototype.
In this case, this is done for the app.js construct.
Arguments are not passed down since each constructor is injected via the context DI container.
*/
function constructCreator(_) {

	return {
		createFrom: function (Parent) {

			return function (name, construct) {

				var constructor = function () {
					var context = arguments[arguments.length - 1];

					this.name = name;
					context.call(Parent, [], this);
					context.call(construct, [], this);
				};

				constructor.prototype = _.extend({}, Parent.prototype, construct.prototype);
				
				return constructor;
			};
		}
	};
}

appui.service("appui.constructCreator", ["_", appui.constructCreator = constructCreator]);