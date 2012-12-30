﻿(function () {

	var Pages = {
		pages: null,
		pageTypes: null,
		start: function () {
			var fetchPages;
			
			Pages.pages = new PageModels.Pages();
			Pages.pageTypes = new PageModels.PageTypes();

			Session.AjaxRequest.handle(Pages.pageTypes.fetch());

			fetchPages = Pages.pages.fetch({
				data: {
					author: Session.currentUser.get("username"),
					orderDesc: "modified"
				}
			});
			
			Session.AjaxRequest.handle(fetchPages).then(function () {

				var mainView = new Pages.MainView({
					el: $("#frame-body")
				});
				
				mainView.render();
			});
		}
	};

	window.Pages = Pages;
})();


