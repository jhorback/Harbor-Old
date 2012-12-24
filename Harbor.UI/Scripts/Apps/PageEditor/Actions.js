PageEditor.addComponent = function (page, key, type) {
	var template, comp, typeProp;
		

	// adjust the template in the page model
	comp = {
		key: key,
		uicid: page.template.getNextUICID()
	};
	typeProp = page.template.get(type); // could be array or prop (e.g. header)
	if (type === "content") {
		comp.classNames = ["col1"];
	}

	if (type === "header") {
		typeProp = comp;
	} else {
		typeProp.push(comp);
	}
	page.template.set(type, typeProp);


	// save
	AjaxRequest.handle(page.save()).then(function () {
		
		// add the new el
		var el = $('<div class="uic"/>').attr("id", comp.uicid).attr("data-type", key).hide();
		if (type === "content") {
			el.addClass(comp.classNames.join(" "));
			$(".page-content").find(".uic-add").before(el);
		} else if (type === "aside") {
			$(".page-aside").find(".uic-add").before(el);
		} else {
			$(".page-header").html(el);
		}

		PageEditor.createComponent(comp.uicid);
		el.fadeIn();
	});
};

PageEditor.deleteComponent = function (page, uicid) {
	/// <summary>
	/// Handles deletion of content and aside uics
	/// </summary>
	var uicel = $("#" + uicid),
		compArray,
		compArrayType;

	if (confirm("Are you sure you want to delete this content?")) {
		compArrayType = uicel.closest(".page-content").length > 0 ? "content" : "aside";
		compArray = page.template.get(compArrayType);
		compArray = _.filter(compArray, function (item) {
			return item.uicid !== uicid;
		});
	
		// loop through and delete anything that begins with uicid-
		page.template.set(compArrayType, compArray);

		// allow decoupled cleanup of page properties
		PageEditor.trigger("componentDeleted", page, uicid);		

		uicel.fadeOut(function () {
			uicel.remove();
		});
		AjaxRequest.handle(page.save());
	}
};