var UserModel = Application.Model.extend({
	urlRoot: Session.url("api/users"),
	idAttribute: "userName",
	defaults: {
		id: null,
		cid: null,
		userName: null,
		password: null,
		confirmPassword: null,
		firstName: null,
		middleName: null,
		lastName: null,
		displayName: null,
		email: null,
		created: null,
		lastLogin: null,
		lastActivity: null,
		enabled: false,
		editLink: null,
		roles: [],
		disabledText: "",
		//
		displayEmail: null
	},
	
	sync: function (method, model, options) {
		if (method === "update" && this.isNewUser()) {
			method = "create";
		}
		return Backbone.sync(method, model, options);
    },
	
	initialize: function () { },

	validate: function (onSave) {
		var pw, cpw, errors;

		if (onSave !== true) {
			return undefined;
		}

		pw = this.get("password");
		cpw = this.get("confirmPassword");
		errors = modelErrors.create();
		if (pw !== cpw) {
			errors.add("The passwords do not match.");
		}
		if (this.isNewUser() && pw === null) {
			errors.add("password", "Required.");
		}
		
		return errors.toJSON();
	},
	
	isNewUser: function () {
		return this.get("created") === null;
	},

	userName: {
		validate: {
			required: true	
		}
	},
	
	displayName: {
		get: function (currentValue) {
			var fn = this.get("firstName") || "",
				mn = this.get("middleName") || "",
				ln = this.get("lastName") || "";

			return $.trim($.trim(fn + " " + mn) + " " + ln);
		}, 
		set:  function (value) {
			var parts = (value || "").split(" "),
				toSet = {
					firstName: parts.shift(),
					lastName: parts.pop(),
					middleName: parts.join(" ")
				};
			this.set(toSet);
			return value;
		},
		validate: {
			required: true
		},
		
		bind: ["firstName", "middleName", "lastName"]
	}, 

	editLink: {
		get: function () {
			return Session.url("user/admin/edit/") + this.get("userName");
		}
	},
	
	firstName: {
		validate: {
			required: true
		}
	},

	displayEmail: {
		get: function (currentValue) {
			var email = this.get("email");
			return !email || !$.trim(email) ? "(not set)" : email;
		},
//		set: function (value) {
//			debugger;
//			return value;
//		},
		bind: ["email"]
	},
	
	email: {
		validate: {
			email: true
		}
	},
	
	disabledText: {
		get: function (currentValue) {
			if (this.get("enabled") === false) {
				return "(disabled)";
			}
			return "";
		},
		bind: "enabled"
	}
});