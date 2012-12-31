Settings.MainView = Application.View.extend({
	initialize: function () {
		this.render();
	},

	render: function () {
		this.bindModelToView();
	},

	events: {
		"change [name=showSignInLink]": function () {
			Session.AjaxRequest.handle(this.model.save());
		},

		"click .editable": function (event) {
			var editable = $(event.target).closest(".editable"),
				id = editable.attr("id");
			
			if (id === "settings-applicationName") {
				Settings.editName(editable, this.model);
			}
		},
		
		"click #settings-changehome": function () {
			alert("here");
		}
	}
});