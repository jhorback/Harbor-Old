


function currentUser() { }

currentUser.prototype = {
	defaults: {
		showSignInLink: true,
		isAuthenticated: false,
		username: null,
		usersDisplayName: null,
		hasDocPermissions: false,
		hasFilePermissions: false,
		hasSettingsPermissions: false,
		isSysAdmin: false,
		payPalMerchantAccountID: null
	},
	
	isSysAdmin: {
		get: function (value) {
			return value;
		},
		bind:["isAuthenticated"]
	}
};


currentUserModel.model("currentUser", [currentUser]);
