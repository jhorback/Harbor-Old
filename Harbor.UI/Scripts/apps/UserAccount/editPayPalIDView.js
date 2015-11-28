
userAccount.editPayPalIDView = {
    mixins: ["userAccountEditViewMixin"],

    beforeInit: function () {
        _.extend(this.options, {
            dialogTitle: "PayPal Merchant Account ID"
        });
    }
};

userAccount.view("editPayPalIDView",
    userAccount.editPayPalIDView
);
