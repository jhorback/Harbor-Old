var Settings = {
	start: function () {
		var settings = new Settings.AppSettings();
		settings.fetch().then(function () {
			var mainView = new Settings.MainView({
				el: $(".page-content"),
				model: settings
			});
		});
	}
};

Settings.MainView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, "editName");
		this.render();
	},

	render: function () {
		Session.ModelBinder(this.model, this.$el.show());
	},

	editName: function (editable) {
		var view = new Settings.EditNameView({model: this.model, editable: editable});
	},

	events: {
		"change [name=showSignInLink]": function () {
			Session.AjaxRequest.handle(this.model.save());
		},

		"click .editable": function (event) {
			var editable = $(event.target).closest(".editable");
			var id = editable.attr("id");
			var methods = {
				"settings-applicationName": this.editName
			};
			methods[id](editable);
		}
	}
});


Settings.AppSettings = Backbone.Model.extend({
	url: Session.url("api/appsettings"),
	sync: function(method, model, options) {
		if (method === "create") {
			method = "update";
		}
		return Backbone.sync(method, model, options);
    },
	defaults: {
		applicationName: null,
		showSignInLink: true
	},

	initialize: function () {
		//Session.GetSetModelExtension.extend(this);
		Session.ValidationModelExtension.extend(this);
	},

	applicationName: {
		validate: {
			required: true
		}
	}
});


Settings.EditNameView = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
		Session.BackupModelExtension.extend(this.model);
		Session.FormErrorHandler.extend(this, this.model);

		_.bindAll(this, "saveModel", "dispose");
		this.$el.bind("close", this.dispose);
		this.model.store();
		this.render();
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
			editable = this.options.editable,
			self = this;

		this.JST("Settings-EditApplicationName", model).then(function (result) {
			$el.html(result);
			self.views("dialog", new Session.Dialog($el, {
				title: "Application Name",
				modal: true,
				editorFor: editable,
				transition: "fade"
			}));

			Session.ModelBinder(model, $el);
		});
	},

	saveModel: function () {
		if (!this.isModelValid()) {
			return;
		}

		Session.AjaxRequest.handle(this.model.save(), {
			success: function () {
				var name = this.model.get("applicationName"),
					title = document.title;
				document.title = title.replace(this.model.memento.applicationName, name);

				this.model.store();
				$("#frame-logo a").html(name);
				// this.views("dialog").close(_.bind(this.dispose, this));
				this.dispose();
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},

	dispose: function () {
		this.model.restore();
		Session.ViewExtension.dispose.apply(this);
	}
});