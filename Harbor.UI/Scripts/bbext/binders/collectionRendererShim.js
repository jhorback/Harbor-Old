
/*
A shim relied on by the collectionRenderer to support
not having to create a view the root of the collection
*/
function collectionRendererShim() {
	
}

collectionRendererShim.prototype = {
	parse: function (el) {
		var collections = el.find("[data-collection]:not([data-templatefor])");
		collections.each(function (i, templateEl) {
			$(templateEl).attr("data-templatefor", "view");
		});
	}
};

bbext.shim("collectionRendererShim", [collectionRendererShim]);