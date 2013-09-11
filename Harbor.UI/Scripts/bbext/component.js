/*
component Construct

A UI component is associated with a view that is a root template.

If the component name is userAdmin, the view and root template that will be
looked for is userAdminView.

There are two types of managed and unmageaged components. Managed components 
keep track of the views they create and contain logic around rendering
and closing them. Unmanaged components rely on the components to close themselves
or for the code calling render to track and close them as needed.

The two types of managed components are: Region and element components
These can also be thought of as a page and partial components.
1. Region / Page
	Regions are portions of a page (or the entire page) that are, for the 
	most part, always present. 

	They are singletons and work off of a push/pop pattern. As a new component
	is added to the region, the existing component is detached. When the new 
	component is closed the previous component is re-attached.

	Region components can be defined by defining the regionEl property when defining the component.

	myApp.component("someRegionComponent", {
		regionEl: "#frame-header" // any selector or dom node.
	});
	// when injected...
	someRegionComponent.render(); // regionEl can also be defined in the options passed to render.
	someRegionComponent.close();


2. Element / Partial
	Element components can be thought of as partials. The code
	responsible for rendering the component can also close the component through
	the element it is associated with.

	Element components are instances and work off of a replace pattern. If a new component
	is created in an element with an existing comonent, the existing component is closed
	then the new component is created in its place.
	
	myApp.component("someElementComponent")
	// when injected...
	someElementComponent.render({ parentEl: ".some-element"}); // can also pass in a model
	someElementComponent.close(".some-element");
	


The two types of unmanged components are dialog and inline components.
Dialogs can also be though of as overlays.
1. Dialog / Overlay
	Dialog components are autonomous components in that they manage their own location
	and closing. They can be used for any kind of dialog or overlay such as a menu.

	myApp.component("aColorPicker");
	// when injected...
	aColorPicker.render(options); // jch* may need to pass a model here .render(null, model) is inelegant 
	                       // jch* but since this would be unmanaged could set the model on the component in another way
						   // aColorPicker.setOptions("sadf");
						   // aColorPicker.render();
						   // this feels disconnected - wait until the use case.
						          el can be a string, jQuery el, or node
								  model can be a plain object or a backbone model


2. Inline
	Inline components are components that are rendered after their root template in the DOM.
	Application components are inline by default.

	myApp.component("someInlineComponent", {
		insertAfterTemplate: true
	});
	// when injected...
	someInlineComponent.render();

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
		render: function (options) {
			var comp = this,
			    _ = privates[this],
			    view;
			
			_.console.group("component.render:", this.name);
			
			options = options || {};
			options.insertAfterTemplate = this.insertAfterTemplate;
			if (options.regionEl) {
				this.regionEl = options.regionEl;
			}
			
			if (options.regionEl) {
				this.region = options.region = _.region(this.regionEl);
			}

			this.close();
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


