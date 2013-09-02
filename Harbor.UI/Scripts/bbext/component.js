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
		render: function (el) {
			var comp = this,
				_ = privates[this];
		
			_.console.group("component.render:", this.name);
			this.close();
			if (el || this.el) {
				this.region = _.region(el || this.el);
			}

			this.view = _.templateRenderer.render(this.name + "View", this.region);
			this.view.on("close", function () {
				comp.close();
			});

			_.console.groupEnd();
		},
	
		close: function () {
			this.region && this.region.pop();
			this.view && this.view.remove();
			this.region = null;
			this.view = null;
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


