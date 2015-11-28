
userAccount.editEmailView = {
    mixins: ["userAccountEditViewMixin"],

    beforeInit: function () {
        _.extend(this.options, {
            dialogTitle: "Email"
        });
    }
};

userAccount.view("editEmailView",
    userAccount.editEmailView
);