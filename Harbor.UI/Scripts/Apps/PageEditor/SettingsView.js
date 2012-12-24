
/*
Options:
	model - Page
*/
PageEditor.SettingsView = Application.View.extend({
	initialize: function () {
		this.listenTo(this.model.template, "change", this.templateChange);
		this.listenTo(this.model, "change", this.pageChange);

		// save events
		this.listenTo(this.model, "change:published", this.saveModel);
		this.listenTo(this.model, "change:title", this.saveModel);
		this.listenTo(this.model.template, "change", this.saveModel);		
	},
	
	events: {
		"click #page-visibility": function () {
			var view = new PageEditor.ChangeVisibilityView({
				model: this.model
			});
			PageEditor.dialogRegion.show(view.render());
		},

		"click #page-delete": function () {
			this.deletePage();
		}
	},

	render: function () {
		this.template("PageEditor-Settings", this.$el)();

		this.bindModelToView(this.model, this.$(".page-header"));
		this.bindModelToView(this.model, this.$("#settings-visibility"));
		this.bindModelToView(this.model.template, this.$("#settings-layout"));
		return this;
	},
	
	templateChange: function () {
		PageEditor.trigger("updateLayout");
	},
	
	pageChange: function () {
		PageEditor.trigger("updatePage");
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



PageEditor.ChangeVisibilityView = Backbone.View.extend({
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

		this.template("PageEditor-ChangeVisibility", this.$el)(model);
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