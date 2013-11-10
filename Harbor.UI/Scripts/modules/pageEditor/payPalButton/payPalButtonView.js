

pageEditor.payPalButtonView = function (options, appurl, currentUserRepo, payPalButtonComponent) {
	this.appurl = appurl;
	this.payPalButtonComponent = payPalButtonComponent;
	this.merchantID = currentUserRepo.getCurrentUser().get("payPalMerchantAccountID");
};

pageEditor.payPalButtonView.prototype = {
	events: {
		"click": "clickPayPalButton"
		//"click .paypal-button": "clickPayPalButton"
	},
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},
	render: function () {
		var shipping = this.model.get("shippingOverride"),
			tax = this.model.get("taxOverride"),
			str = "";
		
		if (this.options.allowEdit) {
			str += '<div><button class="float-right margin">Edit PayPal Button</button></div>';
		}
		
		str += '<span>' + this.model.get("description") + '</span> ' +
			'<div><span>Price:</span> <strong class="loud">' + this.model.get("priceUSD") + '</strong></div>' +
			'<script src="' +
			this.appurl.get("scripts/paypal-button-minicart.min.js?merchant=" + this.merchantID) + '" ' +
			'data-button="' + this.model.get("buttonType") + '"' +
			'data-name="' + this.model.get("name") + '"' +
			'data-quantity="1"' +
			'data-amount="' + this.model.get("price") + '"' +
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
		if (this.options.allowEdit) {
			event.preventDefault();
			this.payPalButtonComponent.render({
				model: this.model
			});
		}
	},
	
	onClose: function () {
		this.payPalButtonComponent.close();
	}
};


pageEditor.view("payPalButtonView", [
	"options",
	"appurl",
	"currentUserRepo",
	"payPalButtonComponent",
	pageEditor.payPalButtonView
]);