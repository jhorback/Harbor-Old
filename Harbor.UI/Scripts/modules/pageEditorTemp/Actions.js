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

