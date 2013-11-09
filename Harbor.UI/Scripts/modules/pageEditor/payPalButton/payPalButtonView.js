

pageEditor.payPalButtonView = function (options, appurl, currentUserRepo) {
	this.appurl = appurl;
	this.merchantID = currentUserRepo.getCurrentUser().get("payPalMerchantAccountID");
};

pageEditor.payPalButtonView.prototype = {
	events: {
		"click .paypal-button": "clickPayPalButton"
	},
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},
	render: function () {
		var shipping = this.model.get("shippingOverride"),
			tax = this.model.get("taxOverride"),
			str;
		
		str = '<span>' + this.model.get("description") + '</span> ' +
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

		this.$el.empty();
		this.$el.append($(str));
	},

	clickPayPalButton: function (event) {
		event.preventDefault();
	}
};


pageEditor.view("payPalButtonView", [
	"options",
	"appurl",
	"currentUserRepo",
	pageEditor.payPalButtonView
]);