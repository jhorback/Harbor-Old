

pageEditor.payPalButton = function (payPalButtonComponent, viewRenderer) {
	this.payPalButtonComponent = payPalButtonComponent;
	this.viewRenderer = viewRenderer;
	
	this.$el.find(".paypal-button").on("click.paypalbutton", function (event) {
		event.preventDefault();
	});
};

pageEditor.payPalButton.prototype = {
	model: "payPalButtonModel",

	create: function () {
		this.open();
	},

	open: function () {
		//this.viewRenderer.render("payPalButtonComponentView", {
		//	el: this.$el,
		//	componentModel: this.model,
		//	uicid: this.uicid
		//});
		this.payPalButtonComponent.render({
			componentModel: this.model,
			uicid: this.uicid
		});
	},

	close: function () {
		this.payPalButtonComponent.close();
	},
	
	remove: function () {
		this.$el.find(".paypal-button").unbind(".paypalbutton");
	}
};


pageEditor.pageComponent("paypalbutton", ["payPalButtonComponent", "viewRenderer", pageEditor.payPalButton]);
