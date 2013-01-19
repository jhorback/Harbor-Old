(function () {

	var PageLoader,		// the app root
		pageState,		// a model containing the page state/mode: view, edit, settings
		loadPageEditor,	// deferred for loading the page editor script
		currentPage,	// the Page model of the current page
		changeMode,		// object containing methods for handling the changing of the page mode
		pageEl,
		editView,
		settingsView,
		frameBody;

	PageLoader = {		
		start: function (pageDto) {
			var nav;

			currentPage = new PageModels.Page(pageDto),
			nav = new PageLoader.PageNav({
				model: pageState
			});

			nav.render();
			pageEl = $("#page"); 
			frameBody = $("#frame-body");
			frameBody.append(nav.el);
		},
		
		getPageEl: function () {
			return pageEl;
		}
	};

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
			pageEl.show();
		},
		
		/* jch* - potential for future refactor - can make the entry point PageEditor.init, destroy
			would have to work in both edit and settings
			for now, just setting the currentPage property on the PageEditor
			would also defer template loading for: AllComponentTemplates.cshtml
		*/
		edit: function () {
			pageEl.show();
			if (!editView) {
				PageEditor.currentPage = currentPage;
				editView = new PageEditor.EditView({ el: pageEl, model: currentPage });
				editView.render();
			}
			if (settingsView) {
				settingsView.$el.hide();
			}
		},

		settings: function () {
			pageEl.hide();
			if (settingsView) {
				settingsView.$el.show();
			} else {
				PageEditor.currentPage = currentPage;
				settingsView = new PageEditor.SettingsView({ model: currentPage });
				settingsView.render();
				frameBody.append(settingsView.el);
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