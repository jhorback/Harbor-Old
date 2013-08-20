Settings.EditNameView = Application.View.extend({
	initialize: function () {
		this.model.store();
	},
	
	dialog: null,

	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		},
		
		"close": function (event) {
			this.model.restore();
		},

		"destroy": function (event) {
			this.remove();
		}
	},

	render: function () {
		this.template("Settings-EditApplicationName", this.$el)(this.model);
		
		this.dialog = new Dialog(this.$el, {
			title: "Application Name",
			modal: true,
			editorFor: this.options.editable,
			transition: "fadein"
		});

		this.bindModelToView();
	},

	saveModel: function () {
		if (!this.isModelValid()) {
			return;
		}

		AjaxRequest.handle(this.model.save(), {
			success: function () {
				var name = this.model.get("applicationName"),
					title = document.title;
				document.title = title.replace(this.model.memento.applicationName, name);

				this.model.store();
				this.dialog.close();
				$("#frame-logo a").html(name);
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	}
});