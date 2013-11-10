

pageEditor.payPalButton = function (payPalButtonComponent, viewRenderer, payPalButtonRepo) {
	var buttonID;
	
	this.payPalButtonComponent = payPalButtonComponent;
	this.viewRenderer = viewRenderer;
	
	this.$el.find(".paypal-button").on("click.paypalbutton", function (event) {
		event.preventDefault();
	});
	
	buttonID = this.model.get("payPalButtonID");
	this.model.payPalButton = payPalButtonRepo.getButton(buttonID);
	this.model.payPalButton.on("change:id", function () {
		this.model.set("payPalButtonID", this.model.payPalButton.get("id"));
	}, this);
};

pageEditor.payPalButton.prototype = {
	model: "payPalButtonModel",

	create: function () {
		this.open();
	},

	open: function () {
		this.renderView(true);
	},

	close: function () {
		this.renderView(false);
	},
	
	renderView: function (allowEdit) {
		this.view && this.view.close({ remove: false });
		this.view = this.viewRenderer.render("payPalButtonView", {
			el: this.$el,
			model: this.model.payPalButton,
			allowEdit: allowEdit
		});
	},
	
	remove: function () {
		this.$el.find(".paypal-button").unbind(".paypalbutton");
	}
};



pageEditor.pageComponent("paypalbutton", [
	"payPalButtonComponent", "viewRenderer", 
	"payPalButtonRepo",
	pageEditor.payPalButton
]);
