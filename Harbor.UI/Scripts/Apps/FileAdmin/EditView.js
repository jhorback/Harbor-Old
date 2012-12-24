FileAdmin.EditView = Application.View.extend({
	initialize: function () {

		_.bindAll(this, "saveModel");
		
		this.model.store();
	},
	
	events: {
		"click #fileadmin-delete": function () {
			var answer = confirm("Are you sure you want to delete this file?");
			if (!answer) {
				return;
			}
			this.model.destroy();
			FileAdmin.main();
		},
		"click [data-rel=cancel]": function () {
			this.model.restore();
			UserAdmin.main();			
		},
		"click button.loud": "saveModel",
		"submit form": "saveModel"
	},
	
	saveModel: function (event) {
		event.preventDefault();
		
		if (!this.isModelValid()) {
			return;
		}

		Session.AjaxRequest.handle(this.model.save(), {
			success: function () {
				this.model.store();
				this.options.onSuccess && this.options.onSuccess.apply(this, arguments);				
				UserAdmin.main();		
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},
	
	render: function () {
		var $el = this.$el,
			model = this.model,
			self = this;

		this.JST("FileAdmin-Edit", this.model).then(function (result) {
			var rolesEl;
			$el.html(result);
			Session.ModelBinder(model, $el);
		});
		
		return this;
	}
});
