
UserAccount.BaseEditView = Backbone.View.extend({
	initialize: function () {
		DisposeViewExtension.extend(this);
		JstViewExtension.extend(this);
		BackupModelExtension.extend(this.model);
		FormErrorHandler.extend(this, this.model);

		_.bindAll(this, "saveModel", "dispose");
		this.$el.bind("close", this.dispose);
		this.model.store();
		this.render();
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.saveModel();
		}
	},
	
	render: function () {
		var $el = this.$el,
			model = this.model,
			editable = this.options.editable;

		this.template(this.options.templateName, this.$el)(model);
		
		this.track(new Dialog($el, {
			title: this.options.dialogTitle,
			modal: true,
			editorFor: editable,
			transition: "fade"
		}));
		
		this.track(new ModelBinder(model, $el));
	},
	
	saveModel: function () {
		if (!this.isModelValid()) {
			return;
		}

		Session.AjaxRequest.handle(this.model.save(), {
			success: function () {
				this.options.onSuccess && this.options.onSuccess.apply(this, arguments);
				this.model.store();
				// this.views("dialog").close(_.bind(this.dispose, this));
				this.dispose();
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},

	dispose: function () {
		this.model.restore();
		DisposeViewExtension.dispose.apply(this);
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