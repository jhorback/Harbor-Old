
var pageSelector = context.module("pageSelector").use("bbext");


/*
var PageSelector = new Application({
	start: function (options, callbackContext) {
		// options: region, close, select
		//ref: use pageRepo.getPages();
		var pages = new pageModel.Pages(),
			mainViewModel = new PageSelector.MainViewModel(),
			mainView = new PageSelector.MainView({
				model: mainViewModel,
				collection: pages
			});
		options.region.render(mainView);
		mainView.on("close", options.close, callbackContext);
		mainView.on("select", options.select, callbackContext);
		pages.fetch({
			data: {
				orderDesc: "modified"
			}
		});
	},
	
	regions: {
		results: ".pageselector-results"
	}
});
*/