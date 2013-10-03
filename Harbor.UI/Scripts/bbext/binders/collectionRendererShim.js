
/*
A shim relied on by the collectionRenderer to support
not having to create a view the root of the collection
*/
function collectionRendererShim(viewFactory, console) {
	this.viewFactory = viewFactory;
	this.console = console;
}

collectionRendererShim.prototype = {
	parse: function (el) {
		var collections = el.find("[data-collection]:not([data-templatefor])"),
			models = el.find("[data-model]:not([data-templatefor])"),
		    viewFactory = this.viewFactory,
			console = this.console;

		collections.add(models).each(function (i, templateEl) {
			var genericViewName = viewFactory.nextGenericName(),
				data;
			templateEl = $(templateEl);
			data = templateEl.data();
			templateEl.attr("data-templatefor", genericViewName);
			console.debug("Found generic view for", data.model ? "model: " + data.model : "collection: " + data.collection);
		});
	}
};

bbext.shim("collectionRendererShim", ["viewFactory", "console", collectionRendererShim]);