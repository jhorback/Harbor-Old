
session.appMenuView = function (options, ajaxRequest, appurl) {

	this.ajaxRequest = ajaxRequest;
	this.appurl = appurl;
};

session.appMenuView.prototype = {
	initialize: function () {
		this.model = Session.currentUser;
	},

	events: {
		"click #usermenu-signout": "signOut"
	},

	signOut: function (event) {
		var signOutRequest;

		event.preventDefault();

		signOutRequest = $.ajax({ url: this.appurl.get("user/signout") });

		this.ajaxRequest.handle(signOutRequest).then(function () {
			window.location.reload();
		});
	},

	onRender: function () {
		var $el = this.$el,
			model = this.model;

		
		$el.find("h1").html(model.get("usersDisplayName"));
		if (model.get("hasDocPermissions") === false) {
			$el.find("#usermenu-docslink,#usermenu-adddoc").remove();
		}
		if (model.get("hasFilePermissions") === false) {
			$el.find("#usermenu-fileslink,#usermenu-uploadfile").remove();
		}
		if (model.get("hasSettingsPermissions") === false) {
			$el.find("#usermenu-settingslink").remove();
		}

		var menu = new Menu(this.$el, {
			transition: "none",
			anchor: "#frame-session",
			position: {
				my: "left top",
				at: "left bottom",
				//of: "#frame-logo"
			}
		});

		return this;
	}
};

session.view("appMenuView", [
	"options",
	"ajaxRequest",
	"appurl",
	session.appMenuView
]);
