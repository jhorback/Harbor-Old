

pageEditor.payPalButton = function (currentPageRepo, payPalButtonRepo) {
	
	this.currentPageRepo = currentPageRepo;
	this.payPalButtonRepo = payPalButtonRepo;
};

pageEditor.payPalButton.prototype = {

	init: function () {
		var buttonID;

		this.$el.find(".paypal-button").on("click.paypalbutton", function (event) {
			event.preventDefault();
		});

		// this could probably be done better
		buttonID = this.model.get("payPalButtonID");
		this.model.payPalButton = this.payPalButtonRepo.getButton(buttonID, this.model.page.get("title"));
		this.model.payPalButton.on("change:id", function () {
			var changed = this.model.payPalButton.changedAttributes();
			if (changed.id) {
				this.model.set("payPalButtonID", this.model.payPalButton.get("id"));
				this.currentPageRepo.saveCurrentPage();
			}
		}, this);
	},
	
	onRemove: function () {
		this.$el.find(".paypal-button").unbind(".paypalbutton");
	}
};



pageEditor.pageComponent("paypalbutton", [
	"currentPageRepo",
	"payPalButtonRepo",
	pageEditor.payPalButton
]);
