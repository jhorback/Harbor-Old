
currentUserModel.currentUser = {
	
	defaults: {
		showSignInLink: true,
		isAuthenticated: false,
		username: null,
		usersDisplayName: null,
		hasDocPermissions: false,
		hasFilePermissions: false,
		hasSettingsPermissions: false,
		isSysAdmin: false,
		payPalMerchantAccountID: null,
		//
		dispalySignInLink: true
	},
	
	"[dispalySignInLink]": {
		get: function (value) {
			return this.attributes.showSignInLink &&
				document.location.toString().toLowerCase().indexOf("/signin") === -1;
		}
	}
};


currentUserModel.model("currentUser", currentUserModel.currentUser);
