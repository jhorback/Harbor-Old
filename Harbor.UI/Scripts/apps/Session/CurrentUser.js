Session.CurrentUser = Backbone.Model.extend({
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
});