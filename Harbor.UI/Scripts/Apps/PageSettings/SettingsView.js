
PageSettings.SettingsView = Application.View.extend({
	
    pagePreviewView: null,
    
    menu: null,

    initialize: function () {
		this.listenTo(this.model.template, "change", this.templateChange);
		this.listenTo(this.model, "change", this.pageChange);

		// save events
		this.listenTo(this.model, "change:published", this.saveModel);
		this.listenTo(this.model, "change:title", this.saveModel);
		this.listenTo(this.model.template, "change", this.saveModel);
		this.listenTo(PageSettings.events, "modal:opened", function () {
		    this.menu && this.menu.close();
		});
		this.listenTo(PageSettings.events, "modal:closed", function () {
		    this.render();
		});
	},
	
	events: {
		"click #page-visibility": function () {
			var view = new PageSettings.ChangeVisibilityView({
				model: this.model
			});
			view.render(); 
		},

		"click #page-delete": function () {
			this.deletePage();
		}
	},

	render: function () {
	    var menu;
	    
	    this.template("PageSettings-Settings", this.$el)();
	    
        this.menu = new Menu(this.$el, {
	        transition: "none"
	    });

		this.bindModelToView(this.model, this.$(".page-header"));
		this.bindModelToView(this.model, this.$("#settings-visibility"));
		this.bindModelToView(this.model.template, this.$("#settings-layout"));

		this.pagePreviewView = new PageSettings.PagePreviewView({
			el: this.$("#settings-page-preview"),
			model: new PageSettings.PagePreviewModel({ page: this.model })
		});
		this.pagePreviewView.render();
		return this;
	},
	
	templateChange: function () {
		PageSettings.events.trigger("layout:updated");
	},
	
	pageChange: function () {
		PageSettings.events.trigger("page:updated");
	},
	
	saveModel: function () {
		AjaxRequest.handle(this.model.save());
	},
	
	deletePage: function () {
		var answer = confirm("Are you sure you want to delete this page?");
		if (!answer) {
			return;
		}
		this.model.destroy().then(function () {
			history.back();
		});
	}
});





PageSettings.ChangeVisibilityView = Backbone.View.extend({
	initialize: function () {
		JstViewExtension.extend(this);
		DisposeViewExtension.extend(this);
		BackupModelExtension.extend(this.model);
		FormErrorHandler.extend(this, this.model);

		_.bindAll(this, "saveModel", "dispose");
		this.$el.bind("close", this.dispose);
		this.model.store();
	},

	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		}
	},

	render: function () {
		var $el = this.$el,
			model = this.model,
			self = this;

		this.template("PageSettings-ChangeVisibility", this.$el)(model);
		this.track(new Dialog($el, {
			title: "Visibility",
			modal: true,
			transition: "fade"
		}));

		this.track(new ModelBinder(model, $el));
		return this;
	},

	saveModel: function () {
		if (!this.isModelValid()) {
			return;
		}

		Session.AjaxRequest.handle(this.model.save(), {
			success: function () {
				this.model.store();
				this.dispose();
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},

	dispose: function () {
		this.model.restore();
		DisposeViewExtension.dispose.apply(this);
	}
});