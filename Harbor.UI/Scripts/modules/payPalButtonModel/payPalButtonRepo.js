

payPalButtonModel.payPalButtonRepo = function (ajaxRequest, modelFactory) {

	return {
		createButton: function (data) {
			var model = modelFactory.create("payPalButton", data);
			return model;	
		},

		fetchButton: function (button, handler, proxy) {
			return ajaxRequest.handle(button.fetch(), handler, proxy);
		},

		getButton: function (id) {
			var button = this.createButton({id: id});
			if (id) {
				this.fetchButton(button, {
					404: function () {
						// noop
					}
				});
			}
			return button;
		},

		saveButton: function (button, handler, proxy) {
			return ajaxRequest.handle(button.save(), handler, proxy);
		}
	};
};

payPalButtonModel.service("payPalButtonRepo", [
	"ajaxRequest",
	"modelFactory",
	payPalButtonModel.payPalButtonRepo
]);
