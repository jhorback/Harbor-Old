/*
component Construct

Provides a render and close method for UI components.
A UI component is anything with a root template.


Singleton components via regions:
For singleton components, a regionEl property can be defined as
	a selector/node to render the template in a region. 

The render method:
	If not a singleton component, the render method can take an el and an optional model
	to render the component.

Insert After Template:
A property on the component: 'insertAfterTemplate' can be set to true to render the component
view after the location of the template in the DOM (see the templateRenderer).
If a regionEl is defined, or an el is passed to the render method, insertAfterTemplate is ignored.
*/
var Component = (function () {

	var privates = {};

	function Component(templateRenderer, console, region) {
		privates[this] = {
			templateRenderer: templateRenderer,
			console: console,
			region: region
		};
		
		this.region = null;
	}

	Component.prototype = {
		render: function (el, model) {
			var comp = this,
			    _ = privates[this],
			    options = {
				    el: el,
				    model: model
			    },
			    view;
		
			_.console.group("component.render:", this.name);

			this.close();
			if (this.regionEl) {
				this.region = options.region = _.region(this.regionEl);
			}

			view = _.templateRenderer.render(this.name + "View", options);
			if (this.region) {
				this.region.view = view;
				view.on("close", function () {
					comp.close();
				});
			}

			_.console.groupEnd();
			
			return view;
		},
	
		close: function (el) {
			var view = null;
			if (this.region) {
				view = this.region.view;
				this.region.pop();
			} else if (el) {
				view = el.data("view");
			}
			view && view.remove();
		}
	};

	return Component;
}());







function componentConstruct(constructCreator, Component) {
	return constructCreator.createFrom(Component);
}



// register the component as an object also so DI does not instantiate it
Component.prototype.$inject = ["templateRenderer", "console", "region"];
bbext.register("bbext.Component", bbext.Component = Component);
bbext.register("bbext.Component.construct", bbext.Component, "object");


// register the construct
bbext.construct("component", [
	"appui.constructCreator", "bbext.Component.construct",
	bbext.componentConstruct = componentConstruct]);


