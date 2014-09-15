

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




pageEditor.payPalButtonRenderer = function (appurl) {
	return {
		render: function (el, button, merchantId) {
			var shipping = button.get("shippingOverride"),
				tax = button.get("taxOverride"),
				str = "";

			str += '<div><button class="float-right margin">Edit PayPal Button</button></div>';
		
			str += '<span>' + button.get("description") + '</span> ' +
				'<div><span>Price:</span> <strong class="loud">' + button.get("priceUSD") + '</strong></div>' +
				'<script src="' +
				appurl.get("scripts/paypal-button-minicart.min.js?merchant=" + merchantId) + '" ' +
				'data-button="' + button.get("buttonType") + '"' +
				'data-name="' + button.get("name") + '"' +
				'data-quantity="1"' +
				'data-amount="' + button.get("price") + '"' +
				'data-currency="USD"';
		
			if (shipping) {
				str += 'data-shipping="' + shipping + '"';
			}

			if (tax) {
				str += 'data-tax="' + tax + '"';
			}
			str += '></script>';
		
		
			if (!merchantId) {
				str += '<div class="alert margin"><h1>No Merchant ID</h1>' +
					'<p>You need to set your Merchant ID in your account settings.</p></div>';
			}

			el.empty();
			el.append($(str));
		}
	}
};

pageEditor.service("payPalButtonRenderer", ["appurl", pageEditor.payPalButtonRenderer]);