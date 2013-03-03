FileAdmin.EditView = Application.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change", this.saveModel);
		this.model.store();
		_.bindAll(this, "saveModel");
	},
	
	events: {
		"click #fileadmin-delete": function () {
			var answer = confirm("Are you sure you want to delete this file?");
			if (!answer) {
				return;
			}
			FileAdmin.main();
			FileAdmin.events.trigger("file:removed", this.model);
			this.model.destroy();
		},
		
		"click [data-rel=cancel]": function () {
			FileAdmin.main();			
		}
	},
	
	saveModel: function (event) {
		if (!this.isModelValid()) {
			this.$("form").addClass("error");
			this.model.restore("name");
			return;
		} else {
			this.$("form").removeClass("error");			
		}

		AjaxRequest.handle(this.model.save(), {
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},
	
	render: function () {
		this.bindTemplate("FileAdmin-Edit");
		return this;
	}
});
