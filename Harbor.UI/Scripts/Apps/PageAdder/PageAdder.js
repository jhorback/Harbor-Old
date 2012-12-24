(function () {

	Session.on("addPage", function () {
		PageModels.init().then(function () {
			PageAdder.addPage();
		});
	});
	
	var openView,
		pageTypesDfd,
		PageAdder = {
			addPage: function () {
				if (openView) {
					openView.dispose();
				}
				openView = new PageAdder.AddPageView();
				openView.render();
			}
		};

	window.PageAdder = PageAdder;
})();


PageAdder.AddPageView = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
		Session.FormErrorHandler.extend(this);

		this.model = new PageModels.Page();
		this.model.set("author", Session.currentUser.get("username"));
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		}
	},

	render: function () {
		var $el = this.$el,
			self = this;

		this.JST("PageAdder-AddPage", {
			page: this.model,
			pageTypes: PageModels.pageTypes
		}).then(function (result, model) {
			$el.html(result);
			self.views("dialog", new Session.Dialog($el, {
				title: "Add a page",
				modal: true,
				transition: "fade"
			}));

			self.renderPageTypes($el.find("#pageadder-pagetypekey"), model.pageTypes);
			Session.ModelBinder(model.page, $el);
		});
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

		Session.AjaxRequest.handle(this.model.save(), {
			clientError: function (response) {
				self.displayErrors(response.errors);
			},
			success: function (page) {
				window.location = new PageModels.Page(page).getUrl();
			}
		});
	}
});
