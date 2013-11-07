

pageEditor.payPalButton = function (payPalButtonComponent) {
	this.payPalButtonComponent = payPalButtonComponent;
	
	this.$el.find("a").on("click.link", function (event) {
		event.preventDefault();
	});
};

pageEditor.payPalButton.prototype = {
	model: "payPalButtonModel",

	create: function () {
		this.open();
	},

	open: function () {
		this.payPalButtonComponent.render({
			componentModel: this.model,
			uicid: this.uicid
		});
	},

	close: function () {
		this.payPalButton.close();
	},
	
	remove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("paypalbutton", ["payPalButtonComponent", pageEditor.payPalButton]);
