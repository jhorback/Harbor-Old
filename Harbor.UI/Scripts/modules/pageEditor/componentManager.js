

pageEditor.componentManager = function ($, _, Backbone, context, console, currentPageRepo) {
	var componentManager,
		page = currentPageRepo.getCurrentPage(),
	    template = page.template,
		layout = page.layout,
	    components = {},
	    currentComponent = null;


	componentManager = {
		init: function () {
			layout.header && registerComponent(layout.header, "header");
			layout.aside && registerComponent(layout.aside, "aside");
			template.content.map(function (component) {
				registerComponent(component, "content");
			});
			template.content.on("add", onAddContent);
		},

		open: function (uicid) {
			if (currentComponent && currentComponent.uicid === uicid) {
				return;
			}
			
			closeCurrentComponent();

			currentComponent = components[uicid];
			if (currentComponent) {
				currentComponent.open();
				componentManager.trigger("open", currentComponent);
				console.log("componentManager:opened - uicid:", uicid);
			}
		},

		deleteComponent: function (uicid) {
			var comp = components[uicid];

			if (comp) {
				if (currentComponent && currentComponent.uicid === comp.uicid) {
					closeCurrentComponent();
				}
				comp.remove();
				componentManager.trigger("delete", comp);
				componentManager.trigger("remove", comp);
				delete components[uicid];
				console.log("componentManager.deleted - uicid:", uicid);
			}
		},
		
		destroy: function () {
			closeCurrentComponent();
			
			$.each(components, function (uicid, comp) {
				comp.remove();
				componentManager.trigger("remove", comp);
				console.log("Removed page component", comp.type, comp.uicid);
			});
			components = {};

			template.content.off("add", onAddContent);
		},
	};
	
	_.extend(componentManager, Backbone.Events);
	
	return componentManager;
	
	
	function closeCurrentComponent() {
		if (currentComponent) {
			currentComponent.close();
			componentManager.trigger("close", currentComponent);
			console.log("componentManager.closed - uicid:", currentComponent.uicid);
		}
	}

	function registerComponent(componentModel, type) {
		var key, uicid, component, el, instantiateArgs;

		type = type || "content"; // mostly informational
		uicid = componentModel.get("id");
		key = componentModel.get("key");
		componentModel.page = page;

		// the header or aside can be null
		if (!key) {
			return null;
		}
		
		el = $("#" + uicid);
		if (el.length === 0) {
			el = $('<div id="' + uicid + '"/>');
		}

		instantiateArgs = [{
			type: type,
			key: key,
			uicid: uicid,
			componentModel: componentModel,
			page: page,
			$el: el
		}];

		// don't catch errors
		component = components[uicid] = context.instantiate(key, instantiateArgs);
		console.log("Created page component", type, key, uicid);

		return component;
	}

	function onAddContent(model, collection, options) {
		var component = registerComponent(model, "content");

		closeCurrentComponent();
		currentComponent = component;
		componentManager.trigger("create", component);
		component.create();
		componentManager.trigger("open", component);
	}
};


pageEditor.service("componentManager", [
	"$", "_", "Backbone", "context", "console", "currentPageRepo",
	pageEditor.componentManager]);
