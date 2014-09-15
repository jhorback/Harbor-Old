

payPalButtonModel.payPalButtonRepo = function (ajaxRequest, modelFactory) {

	return {
		createButton: function (data, defaultName) {
			var model = modelFactory.create("payPalButton", data, {
				defaultName: defaultName
			});
			return model;	
		},

		fetchButton: function (button, handler, proxy) {
			return ajaxRequest.handle(button.fetch(), handler, proxy);
		},

		getButton: function (id, defaultName) {
			var button = this.createButton({id: id}, defaultName);
			if (id) {
				this.fetchButton(button, {
					404: function () {
						// button.synced = true;
						button.set("id", null);
					}
				});
			}
			return button;
		},

		saveButton: function (button, handler, proxy) {
			var buttonSaved = button.safeSave();
			if (!buttonSaved) {
				return ajaxRequest.resolved();
			}
			return ajaxRequest.handle(buttonSaved, handler, proxy);
		}
	};
};

payPalButtonModel.service("payPalButtonRepo", [
	"ajaxRequest",
	"modelFactory",
	payPalButtonModel.payPalButtonRepo
]);
