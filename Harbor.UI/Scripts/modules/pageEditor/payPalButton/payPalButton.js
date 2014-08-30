

pageEditor.payPalButton = function (currentPageRepo, viewRenderer, payPalButtonRepo) {
	var buttonID;
	
	this.currentPageRepo = currentPageRepo;
	this.viewRenderer = viewRenderer;
	
	this.$el.find(".paypal-button").on("click.paypalbutton", function (event) {
		event.preventDefault();
	});
	
	buttonID = this.model.get("payPalButtonID");
	this.model.payPalButton = payPalButtonRepo.getButton(buttonID, this.model.page.get("title"));
	this.model.payPalButton.on("change:id", function () {
		var changed = this.model.payPalButton.changedAttributes();
		if (changed.id) {
			this.model.set("payPalButtonID", this.model.payPalButton.get("id"));
			this.currentPageRepo.saveCurrentPage();
		}
	}, this);
};

pageEditor.payPalButton.prototype = {

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
	"currentPageRepo",
	"viewRenderer", 
	"payPalButtonRepo",
	pageEditor.payPalButton
]);
