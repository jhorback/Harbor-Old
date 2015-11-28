
userAccount.userAccountEditViewMixin = function (dialogFactory, ajaxRequest) {

    return {
        dialog: null,

        initialize: function () {
            _.bindAll(this, "saveModel", "close");
            this.beforeInit && this.beforeInit();
            this.$el.bind("close", this.close);
            this.model.store();
        },

        events: {
            "submit form": function (event) {
                event.preventDefault();
                this.saveModel();
            }
        },

        onRender: function () {
            this.dialog = dialogFactory.create(this.$el, {
                title: this.options.dialogTitle,
                editorFor: this.options.editable
            });
        },

        saveModel: function () {
            if (!this.isModelValid()) {
                return;
            }

            ajaxRequest.handle(this.model.save(), {
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
    };
}

userAccount.mixin("userAccountEditViewMixin", [
    "dialogFactory",
    "ajaxRequest",
    userAccount.userAccountEditViewMixin
]);


/*


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

UserAccount.EditPayPalIDView = UserAccount.BaseEditView.extend({
initialize: function () {
    _.extend(this.options, {
        templateName: "UserAccount-EditPayPalID",
        dialogTitle: "PayPal Merchant Account ID"
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
*/