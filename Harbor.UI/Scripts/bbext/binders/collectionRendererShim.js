
/*
A shim relied on by the collectionRenderer to support
not having to create a view the root of the collection
*/
function collectionRendererShim(viewFactory) {
	this.viewFactory = viewFactory;
}

collectionRendererShim.prototype = {
	parse: function (el) {
		var collections = el.find("[data-collection]:not([data-templatefor])"),
		    viewFactory = this.viewFactory;
		collections.each(function (i, templateEl) {
			var genericViewName = viewFactory.nextGenericName();
			$(templateEl).attr("data-templatefor", genericViewName);
		});
	}
};

bbext.shim("collectionRendererShim", ["viewFactory", collectionRendererShim]);