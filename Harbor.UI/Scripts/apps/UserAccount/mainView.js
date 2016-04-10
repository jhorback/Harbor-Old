
userAccount.userAccountMainView = {
    initialize: function () {
        _.bindAll(this, "editName", "editEmail", "editPayPalID", "changePassword");
	},

    //modelBinder.create(model, el, matches) {
	onRender: function () {
		this.$(".page-content").show();
	},

	editName: function (editable) {
	    this.viewRenderer.render("editNameView", {
	        model: this.model,
	        editable: editable
	    });
	},

	editEmail: function (editable) {
	    this.viewRenderer.render("editEmailView", {
	        model: this.model,
	        editable: editable
	    });
	},
	
	editPayPalID: function (editable) {
	    this.viewRenderer.render("editPayPalIDView", {
	        model: this.model,
	        editable: editable
	    });
	},

	changePassword: function () {
	    this.viewRenderer.render("changePasswordView", {
	        model: this.model
	    });
	},
	
	events: {
		"click [name=changePassword]": function () {
			this.changePassword();
		},

		"click .link": function (event) {
		    var editable = $(event.target).closest("dd"),
                id = editable.attr("id"),
                methods = {
				    "ua-name": this.editName,
				    "ua-email": this.editEmail,
				    "ua-paypal": this.editPayPalID
			    };
			methods[id](editable);
		}
	}
};



userAccount.view("userAccountMainView", [
    "options",
    "viewRenderer",
    userAccount.userAccountMainView
]);