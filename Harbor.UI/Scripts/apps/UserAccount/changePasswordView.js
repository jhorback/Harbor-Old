
userAccount.changePasswordView = {
    mixins: ["userAccountEditViewMixin"],

    beforeInit: function () {
        _.extend(this.options, {
            dialogTitle: "Change Password",
            onSuccess: function () {
                this.model.set("password", null, {silent: true});
                this.model.set("confirmPassword", null, { silent: true });
            }
        });
    }
};

userAccount.view("changePasswordView",
    userAccount.changePasswordView
);
