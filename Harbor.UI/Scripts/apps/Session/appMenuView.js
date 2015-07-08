
session.appMenuView = function (options, ajaxRequest, appurl) {

	this.ajaxRequest = ajaxRequest;
	this.appurl = appurl;
};

session.appMenuView.prototype = {
	initialize: function () {
		this.model = Session.currentUser;
		this.render();
	},

	events: {
		"click #usermenu-signout": "signOut"
	},

	signOut: function (event) {
		var signOutRequest;

		event.preventDefault();

		signOutRequest = $.ajax({ url: this.appurl.get("url/signout") });

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
			$el.find("#usermenu-fileslink,#usermenu-uploadfile	").remove();
		}
		if (model.get("hasSettingsPermissions") === false) {
			$el.find("#usermenu-settingslink").remove();
		}

		this.showView(new Menu(this.$el, {
			transition: "none",
			anchor: "#profile-link",
			position: {
				my: "right-10 top",
				at: "right bottom"
			}
		}));

		return this;
	},
	
	showView: function (view) {
		this.view && this.view.close();
		this.view = view;
	},
	
	onClose: function () {
		this.view && this.view.close();
	}
};

session.view("appMenuView", [
	"options",
	"ajaxRequest",
	"appurl",
	session.appMenuView
]);
