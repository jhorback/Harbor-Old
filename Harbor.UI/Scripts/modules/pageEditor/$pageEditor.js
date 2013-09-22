

var pageEditor = context.module("pageEditor").use("bbext");




function pageEditorService($, context, console, currentPageRepo) {
	
	var page = currentPageRepo.getCurrentPage(),
		template = page.template,
		components = {};


	return {
		render: function () {
			
			addComponentView(template.header);
			template.aside.each(addComponentView);
			template.content.each(addComponentView);

			console.log("pageEditor: opened");
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
		var type, uicid;
		
		uicid = component.get("uicid");
		type = component.get("key");

		try {
			components[uicid] = context.instantiate(type, [{
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
	}
}

pageEditor.service("pageEditor", [
	"$", "context", "console", "currentPageRepo",
	pageEditorService]);