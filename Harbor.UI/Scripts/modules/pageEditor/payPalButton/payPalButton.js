

pageEditor.payPalButton = function (payPalButton) {
	this.payPalButton = payPalButton;
	
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
		this.payPalButton.render({
			model: this.model,
			uicid: this.uicid
		});
		
		// this.$el.empty().append(this.view.$el);
	},

	close: function () {
		// this.view.close({ remove: false });
		this.payPalButton.close();
	},
	
	remove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("paypalbutton", ["payPalButton", pageEditor.payPalButton]);
