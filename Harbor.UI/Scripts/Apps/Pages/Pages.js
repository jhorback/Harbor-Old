(function () {

	var Pages = {
		pages: null,
		pageTypes: null,
		start: function () {
			Pages.pages = new PageModels.Pages();
			Pages.pageTypes = new PageModels.PageTypes();

			Session.AjaxRequest.handle(Pages.pageTypes.fetch());
			Session.AjaxRequest.handle(Pages.pages.fetch()).then(function () {

				var mainView = new Pages.MainView({
					el: $("#frame-body")
				});
				
				mainView.render();
			});
		}
	};

	window.Pages = Pages;
})();


