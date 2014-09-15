

pageEditor.payPalButtonView = function (options, appurl, currentUserRepo, payPalButtonComponent, payPalButtonRenderer) {
	this.appurl = appurl;
	this.payPalButtonComponent = payPalButtonComponent;
	this.payPalButtonRenderer = payPalButtonRenderer;

	this.merchantID = currentUserRepo.getCurrentUser().get("payPalMerchantAccountID");
};

pageEditor.payPalButtonView.prototype = {
	events: {
		"click button": "clickPayPalButton"
	},
	
	initialize: function (options) {
		this.listenTo(this.model.payPalButton, "change", this.render);
		this.model.on("change:payPalButtonID", options.saveCurrentPage);
	},

	render: function () {
		this.payPalButtonRenderer.render(this.$el, this.model.payPalButton, this.merchantID);
	},

	clickPayPalButton: function (event) {
		event.preventDefault();
		this.payPalButtonComponent.render({
			model: this.model.payPalButton,
			merchantID: this.merchantID
		});
	},
	
	onClose: function () {
		this.payPalButtonComponent.close();
	}
};


pageEditor.view("paypalbuttonView", [
	"options",
	"appurl",
	"currentUserRepo",
	"payPalButtonComponent",
	"payPalButtonRenderer",
	pageEditor.payPalButtonView
]);
