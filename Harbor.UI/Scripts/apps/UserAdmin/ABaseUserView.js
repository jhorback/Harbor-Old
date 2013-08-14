UserAdmin.BaseUserView = Application.View.extend({
	initialize: function () {
		
		_.bindAll(this, "saveModel");
		this.model.store();
		
		if (this.options.events) {
			_.extend(this.events, this.options.events);
		}		
	},
	
	events: {
		"click #useradmin-delete": function () {
			var answer = confirm("Are you sure you want to delete this user and all associated data?");
			if (!answer) {
				return;
			}
			this.model.destroy();
			UserAdmin.main();
		},
		"click [data-rel=cancel]": function () {
			this.model.restore();
			UserAdmin.main();			
		},
		"click button.loud": "saveModel",
		"submit form": "saveModel"
	},
	
	saveModel: function (event) {
		event.preventDefault();
		
		if (!this.isModelValid()) {
			return;
		}

		AjaxRequest.handle(this.model.save(), {
			success: function () {
				this.model.store();
				this.options.onSuccess && this.options.onSuccess.apply(this, arguments);				
				UserAdmin.main();		
			},
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},
	
	render: function () {
		var $el = this.$el,
			model = this.model,
			self = this;

		this.JST(this.options.templateName, this.model).then(function (result) {
			var rolesEl;
			$el.html(result);
			rolesEl = $el.find("[data-templ=useradmin-roles]");
			UserAdmin.userRoles.each(function (role) {
				if (role.get("key") === "SysAdmin" && Session.currentUser.get("isSysAdmin") === false) {
					role.set("disabled", "disabled");
				}
				self.JST("UserAdmin-Role", role.toJSON()).then(function (result) {
					rolesEl.append(result);
				});
			});

			self.bindModelToView(model, $el);
		});
		
		return this;
	}
});
