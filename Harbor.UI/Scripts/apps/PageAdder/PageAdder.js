﻿(function () {

	
	
	var openView,
		PageAdder = new Application({
			addPage: function () {
				if (openView) {
					openView.dispose();
				}
				openView = new PageAdder.AddPageView();
				openView.render();
			}
		});
	
	Session.on("page:add", function () {
		// ref: pageTypeRepo.getPageTypes();
		pageModel.loadPageTypes().then(function () {
			PageAdder.addPage();
		});
	});
	


	window.PageAdder = PageAdder;
})();


PageAdder.AddPageView = Application.View.extend({
	initialize: function () {
		// ref: modelFactory.create("page", { author: currentUser.get("username" });
		this.model = new pageModel.Page();
		this.model.set("author", Session.currentUser.get("username"));
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		}
	},

	render: function () {
	    var view, model;
	    
	    model = {
	        page: this.model,
	        pageTypes: pageModel.pageTypes // ref: pageTypeRepo.getPageTypes()
	    };
		this.template("PageAdder-AddPage", this.$el)(model);

		view = new Dialog(this.$el, {
		    title: "Add a page",
		    modal: true,
		    transition: "fade"
		});
	    
		this.renderPageTypes(this.$el.find("#pageadder-pagetypekey"), model.pageTypes);
		this.bindModelToView(model.page, this.$el);
	},

	renderPageTypes: function (el, collection) {
		collection.each(function (item) {
			el.append('<option value="' + item.get("key") + '">' + item.get("name") + '</option>');
		});
	},
	
	saveModel: function () {
		var self = this;

		if (!this.isModelValid()) {
			return;
		}

		AjaxRequest.handle(this.model.save(), {
		    clientError: function (response) {
				self.displayErrors(response.errors);
			},
		    success: function (page) {
			    // ref: use pageurl.get() if possible
				window.location = new pageModel.Page(page).getUrl();
			}
		});
	}
});
