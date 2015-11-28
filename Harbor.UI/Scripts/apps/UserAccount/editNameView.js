
userAccount.editNameView = {
    mixins: ["userAccountEditViewMixin"],

    beforeInit: function () {
        _.extend(this.options, {
            dialogTitle: "Name"
        });
    }
};

userAccount.view("editNameView",
    userAccount.editNameView
);