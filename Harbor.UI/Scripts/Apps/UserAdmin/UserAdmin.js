var UserAdmin = new Application({
	
	users: null, // holds the UserModel collection
	userRoles: null, // holds the UserRole collection

	root: Session.url("User/Admin/"),

	routes: {
		"": "main",
		"add": "addUser",
		"edit/:id": "editUser",
		"*defaultRoute": "main"
	},
	
	regions: {
		"default": "#frame-body"
	},
	
	start: function () {
		var loadData;
		
		UserAdmin.users = new UserAdmin.Users();
		UserAdmin.userRoles = new UserAdmin.UserRoles();

		loadData = $.when(UserAdmin.users.fetch(), UserAdmin.userRoles.fetch());
//		loadData.then(function () {
//			UserAdmin.controller.start();
//		});
	},
	
	main: function () {
		return {
			view: new UserAdmin.MainView({
				collection: UserAdmin.users
			}),
			navigate: "/"
		};
	},

	addUser: function () {
		return {
			view: new UserAdmin.AddView({
				model: new UserModel()
			}),
			navigate: "add"
		};
	},

	editUser: function (id) {
		var user = UserAdmin.users.find(function (u) {
			return u.get("userName").toLowerCase() === id.toLowerCase();
		});
		
		return {
			view: new UserAdmin.EditView({
				model: user
			}),
			navigate: "edit/" + id
		};
	}
});