

pageEditor.componentManager = function ($, _, Backbone, context, console, currentPageRepo) {
	var componentManager,
		page = currentPageRepo.getCurrentPage(),
	    template = page.template,
	    components = {},
	    currentComponent = null;


	componentManager = {
		init: function () {
			registerComponent(template.header);
			template.aside.each(registerComponent);
			template.content.each(registerComponent);
		},

		open: function (uicid) {
			closeCurrentComponent();

			currentComponent = components[uicid];
			if (currentComponent) {
				currentComponent.open();
				componentManager.trigger("open", currentComponent);
			}
		},

		create: function (componentModel) {
			var component = registerComponent(componentModel);

			closeCurrentComponent();
			currentComponent = component;
			component.create();
			componentManager.trigger("create", component);
		},

		"delete": function (uicid) {
			var comp = components[uicid];

			if (comp) {
				if (currentComponent && currentComponent.uicid === comp.uicid) {
					closeCurrentComponent();
				}
				comp.remove();
				componentManager.trigger("delete", comp);
				componentManager.trigger("remove", comp);
				delete components[uicid];
			}
		},
		
		removeAll: function () {
			closeCurrentComponent();
			
			$.each(components, function (uicid, comp) {
				comp.remove();
				componentManager.trigger("remove", comp);
				console.log("Removed page component", comp.type, comp.uicid);
			});
			components = {};
		},
	};
	
	_.extend(componentManager, Backbone.Events);
	
	return componentManager;
	
	
	function closeCurrentComponent() {
		if (currentComponent) {
			currentComponent.close();
			componentManager.trigger("close", currentComponent);
		}
	}

	function registerComponent(componentModel) {
		var type, key, uicid, component;

		uicid = componentModel.get("uicid");
		type = componentModel.get("type");
		key = componentModel.get("key");
		
		try {
			component = components[uicid] = context.instantiate(key, [{
				type: type,
				key: key,
				uicid: uicid,
				component: componentModel,
				page: page,
				$el: $("#" + uicid)
			}]);
			console.log("Created page component", type, key, uicid);
		} catch (e) {
			console.error("Could not create page component:", key, "Error:", e.message);
		}

		return component;
	}

};


pageEditor.service("componentManager", [
	"$", "_", "Backbone", "context", "console", "currentPageRepo",
	pageEditor.componentManager]);
