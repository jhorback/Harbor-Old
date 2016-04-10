
userAccount.userAccountEditViewMixin = function (dialogFactory, ajaxRequest) {

    return {
        dialog: null,

        initialize: {
            before: function () {
                _.bindAll(this, "saveModel", "close");
                this.beforeInit && this.beforeInit();
                this.$el.bind("close", this.close);
                this.model.store();
            }
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
            // how to set show all here?
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
                    this.displayErrors(error.errors, true);
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
