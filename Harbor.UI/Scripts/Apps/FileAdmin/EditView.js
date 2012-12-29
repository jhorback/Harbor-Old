FileAdmin.EditView = Application.View.extend({
	initialize: function () {
		FormErrorHandler.extend(this);
		
		this.listenTo(this.model, "change", this.saveModel);
		_.bindAll(this, "saveModel");
	},
	
	events: {
		"click #fileadmin-delete": function () {
			var answer = confirm("Are you sure you want to delete this file?");
			if (!answer) {
				return;
			}
			FileAdmin.main();
			this.model.destroy();
		},
		"click [data-rel=cancel]": function () {
			FileAdmin.main();			
		}
	},
	
	saveModel: function (event) {

		if (!this.isModelValid()) {
			return;
		}

		AjaxRequest.handle(this.model.save(), {
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},
	
	render: function () {
		this.template("FileAdmin-Edit", this.$el)(this.model.toJSON());
		this.bindModelToView();
		return this;
	}
});
