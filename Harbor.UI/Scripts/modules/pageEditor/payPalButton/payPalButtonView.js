

pageEditor.payPalButtonView = function (options, appurl, currentUserRepo, payPalButtonComponent) {
	this.appurl = appurl;
	this.payPalButtonComponent = payPalButtonComponent;
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
		var shipping = this.model.payPalButton.get("shippingOverride"),
			tax = this.model.payPalButton.get("taxOverride"),
			str = "";

		str += '<div><button class="float-right margin">Edit PayPal Button</button></div>';
		
		str += '<span>' + this.model.payPalButton.get("description") + '</span> ' +
			'<div><span>Price:</span> <strong class="loud">' + this.model.payPalButton.get("priceUSD") + '</strong></div>' +
			'<script src="' +
			this.appurl.get("scripts/paypal-button-minicart.min.js?merchant=" + this.merchantID) + '" ' +
			'data-button="' + this.model.payPalButton.get("buttonType") + '"' +
			'data-name="' + this.model.payPalButton.get("name") + '"' +
			'data-quantity="1"' +
			'data-amount="' + this.model.payPalButton.get("price") + '"' +
			'data-currency="USD"';
		
		if (shipping) {
			str += 'data-shipping="' + shipping + '"';
		}

		if (tax) {
			str += 'data-tax="' + tax + '"';
		}
		str += '></script>';
		
		
		if (!this.merchantID) {
			str += '<div class="alert margin"><h1>No Merchant ID</h1>' +
				'<p>You need to set your Merchant ID in your account settings.</p></div>';
		}

		this.$el.empty();
		this.$el.append($(str));
	},

	clickPayPalButton: function (event) {
		event.preventDefault();
		this.payPalButtonComponent.render({
			model: this.model.payPalButton
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
	pageEditor.payPalButtonView
]);