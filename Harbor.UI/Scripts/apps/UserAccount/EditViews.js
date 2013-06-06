
UserAccount.BaseEditView = Application.View.extend({

    dialog: null,

    initialize: function () {
        BackupModelExtension.extend(this.model); // jch! - remove when UserModel is converted
		_.bindAll(this, "saveModel", "close");
		this.$el.bind("close", this.close);
		this.model.store();
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		}
	},
	
	render: function () {
		this.template(this.options.templateName, this.$el)(this.model);
		
		this.dialog = new Dialog(this.$el, {
			title: this.options.dialogTitle,
			modal: true,
			editorFor: this.options.editable,
			transition: "fade"
		});
		
		this.bindModelToView();
	},
	
	saveModel: function () {
		if (!this.isModelValid()) {
			return;
		}

		Session.AjaxRequest.handle(this.model.save(), {
			success: function () {
				this.options.onSuccess && this.options.onSuccess.apply(this, arguments);
				this.model.store();
				this.dialog && this.dialog.close();
				this.close();
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},

	onClose: function () {
		this.model.restore();
	}
});


UserAccount.EditNameView = UserAccount.BaseEditView.extend({
	initialize: function () {
		_.extend(this.options, {
			templateName: "UserAccount-EditName",
			dialogTitle: "Name"
		});
		UserAccount.BaseEditView.prototype.initialize.apply(this, arguments);
	}
});


UserAccount.EditEmailView = UserAccount.BaseEditView.extend({
	initialize: function () {
		_.extend(this.options, {
			templateName: "UserAccount-EditEmail",
			dialogTitle: "Email"
		});
		UserAccount.BaseEditView.prototype.initialize.apply(this, arguments);
	}
});


UserAccount.ChangePasswordView = UserAccount.BaseEditView.extend({
	initialize: function () {
		_.extend(this.options, {
			templateName: "UserAccount-ChangePassword",
			dialogTitle: "Change Password",
			onSuccess: function () {
				this.model.set("password", null, {silent: true});
				this.model.set("confirmPassword", null, { silent: true });
			}
		});
		UserAccount.BaseEditView.prototype.initialize.apply(this, arguments);
	}
});