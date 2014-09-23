Settings.UpdateFooterView = Application.View.extend({
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
		this.template("Settings-UpdateFooter", this.$el)(this.model);
		
		this.dialog = new Dialog(this.$el, {
			title: "Update Footer",
			modal: true
		});

		this.bindModelToView();
	},

	saveModel: function () {
		var thisView = this;
		AjaxRequest.handle(this.model.save()).then(function () {
			$("#frame-footer-content").html(thisView.model.attributes.footerHtml);
			thisView.dialog.destroy();
		});
	}
});