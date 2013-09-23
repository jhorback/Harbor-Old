

var pageEditor = context.module("pageEditor").use("bbext");




function pageEditorService($, context, console, currentPageRepo) {

	var page = currentPageRepo.getCurrentPage(),
	    template = page.template,
	    components = {},
	    currentComponent = null;


	return {
		render: function () {
			
			addComponentView(template.header);
			template.aside.each(addComponentView);
			template.content.each(addComponentView);

			console.log("pageEditor: opened");
		},
		
		openComponent: function (ucid) {
			currentComponent && currentComponent.close();

			currentComponent = components[uicid];
			if (currentComponent) {
				currentComponent.open();
			}
		},
		
		createComponent: function (component) {
			var view = addComponentView(component);

			currentComponent && currentComponent.close();
			currentComponent = components[view.uicid];
			view.create();
		},
		
		removeComponent: function (uicid) {
			var comp = components[uicid];

			if (comp) {
				if (currentComponent && currentComponent.uicid === comp.uicid) {
					comp.close();
				}
				comp.remove();
				delete components[uicid];
			}
		},
		
		close: function () {
			$.each(components, function (uicid, comp) {
				comp.remove();
				console.log("Removed page component", comp.type, comp.uicid);
			});
			console.log("pageEditor: closed");
		}
	};
	

	function addComponentView(component) {
		var type, uicid, view;
		
		uicid = component.get("uicid");
		type = component.get("key");

		try {
			view = components[uicid] = context.instantiate(type, [{
				type: type,
				uicid: uicid,
				component: component,
				page: page,
				$el: $("#" + uicid)
			}]);
			console.log("Created page component", type, uicid);
		} catch (e) {
			console.error("Could not create page component of type", type, "Error:", e.message);
		}

		return view;
	}
}

pageEditor.service("pageEditor", [
	"$", "context", "console", "currentPageRepo",
	pageEditorService]);