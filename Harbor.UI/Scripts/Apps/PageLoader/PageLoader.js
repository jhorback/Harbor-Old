(function () {

	var PageLoader,		// the app root
		pageState,		// a model containing the page state/mode: view, edit, settings
		loadPageEditor,	// deferred for loading the page editor script
		currentPage,	// the Page model of the current page
		changeMode,		// object containing methods for handling the changing of the page mode
		editView,
		settingsView;

	PageLoader = {		
		start: function (pageDto) {
			var nav, frameBody;

			frameBody = $("#frame-body");
			frameBody.append('<div id="pageloader"/>');
			frameBody.append('<div id="page-settings"/>');			

			currentPage = new PageModels.Page(pageDto);
			nav = new PageLoader.PageNav({
				model: pageState
			});
			PageLoader.regions.loader.render(nav);
		},
		
		regions: {
			"loader": "#pageloader",
			"page": "#page",
			"frameBody": "#frame-body",
			"settings": "#page-settings"
		}
	};
	
	Region.createRegions(PageLoader);

	_.extend(PageLoader, Backbone.Events);


	// app events
	PageLoader.on("editPage", function () {
		pageState.set("mode", "edit");
	});

	PageLoader.on("showPageSettings", function () {
		pageState.set("mode", "settings");
	});

	PageLoader.on("viewPage", function () {
		pageState.set("mode", "view");
	});


	pageState = new Backbone.Model({ mode: "view" });
	pageState.on("change:mode", function (model, mode) {
		loadPageEditor().then(function () {
			changeMode[mode]();
		});
	}, this);

	
	changeMode = {
		view: function () {
			editView && editView.dispose(false);
			editView = null;
			PageEditor.dispose();
			settingsView && settingsView.remove();
			settingsView = null;
			PageLoader.regions.page.showEl();
		},
		
		/* jch* - potential for future refactor - can make the entry point PageEditor.init, destroy
			would have to work in both edit and settings
			for now, just setting the currentPage property on the PageEditor
			would also defer template loading for: AllComponentTemplates.cshtml
		*/
		edit: function () {
			PageLoader.regions.page.showEl();
			if (!editView) {
				PageEditor.currentPage = currentPage;
				editView = new PageEditor.EditView({
					el: PageLoader.regions.page.getEl(),
					model: currentPage
				});
				editView.render();
			}
			if (settingsView) {
				PageLoader.regions.settings.hideEl();
			}
		},

		settings: function () {
			PageLoader.regions.page.hideEl();
			if (settingsView) {
				PageLoader.regions.settings.showEl();
			} else {
				PageEditor.currentPage = currentPage;
				settingsView = new PageEditor.SettingsView({ model: currentPage });
				PageLoader.regions.settings.render(settingsView);
			}
		}
	};

	// jch* just a placeholder for now
	loadPageEditor = function () {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	};


	window.PageLoader = PageLoader;
})();