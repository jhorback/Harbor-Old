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
*/

function Component(templateRenderer, console) {
	this.templateRenderer = templateRenderer;
	this.console = console;
}

Component.prototype = {
	$inject: ["templateRenderer", "console"],
	render: function (model) {
		
		this.console.group("component.render:", this.name);
		this.view = this.templateRenderer.render(this.name, model, this.el);
		this.console.groupEnd();
	},
	
	close: function () {
		this.view && this.view.remove();
	}
};




function componentConstruct(constructCreator, Component) {
	return constructCreator.createFrom(Component);
}



// register the component as an object also so DI does not instantiate it
bbext.register("bbext.Component", bbext.Component = Component);
bbext.register("bbext.Component.construct", bbext.Component, "object");


// register the construct
bbext.construct("component", [
	"appui.constructCreator", "bbext.Component.construct",
	bbext.componentConstruct = componentConstruct]);


