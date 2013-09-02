


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
		isSysAdmin: false
	}
};


currentUserModel.model("currentUser", [currentUser]);
