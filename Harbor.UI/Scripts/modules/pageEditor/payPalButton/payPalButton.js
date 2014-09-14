

pageEditor.payPalButton = {
	init: function () {
		this.$el.find(".paypal-button").on("click.paypalbutton", function (event) {
			event.preventDefault();
		});
	},
	
	onRemove: function () {
		this.$el.find(".paypal-button").unbind(".paypalbutton");
	}
};



pageEditor.pageComponent("paypalbutton", pageEditor.payPalButton);
