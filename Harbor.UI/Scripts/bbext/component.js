/*
component Construct

Provides a render and close method for UI components.
A UI component is anything with a root template.
An el property can be defined as a selector/node to render the template,
    otherwise it will be rendered after the location of the template in the DOM.
	See the templateRenderer.

Usage:
myApp.component("pictureChooser");

myApp.component("pictureChooser", {
	el: "#dialog"
});

myApp.start(function (pictureChooser) {
	pictureChooser.render();
});

Calling render on a component a second time will close the existing component first.
*/

var Component = (function () {

	var privates = {};

	function Component(templateRenderer, console, region) {
		privates[this] = {
			templateRenderer: templateRenderer,
			console: console,
			region: region
		};
		
		this.view = null;
		this.region = null;
	}

	Component.prototype = {
		render: function (model) {
			var comp = this,
				_ = privates[this];
		
			_.rendering = true;
			_.console.group("component.render:", this.name);
			
			if (!_.hasInitialized) {
				_.hasInitialized = true;
				if (this.el) {
					this.region = _.region(this.el);
				}
			} else {
				this.region && this.region.pop();
				this.view && this.view.remove();
			}

			this.view = _.templateRenderer.render(this.name, model, this.region);
			this.view.on("close", function () {
				comp.close();
			});

			_.console.groupEnd();
			_.rendering = false;
		},
	
		close: function () {
			var _ = privates[this];
			this.region && this.region.pop();
			this.view && this.view.remove();
			if (!_.rendering) {
				delete privates[this];
			}
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


