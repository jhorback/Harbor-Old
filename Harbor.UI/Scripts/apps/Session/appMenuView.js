
session.appMenuView = function (options, ajaxRequest, appurl) {

	this.ajaxRequest = ajaxRequest;
	this.appurl = appurl;
};

session.appMenuView.prototype = {
	initialize: function () {
		
	},

	selectMenu: function (event, menuItem) {
		this.model.set("selectedMenuItemId", menuItem.id);
		this.model.trigger("changeMenu");
	},

	selectMenuItem: function (event, menuItem) {
		this.model.set("selectedMenuItemId", menuItem.id);
		this.model.trigger("changeMenu");
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
		var menu = new Menu(this.$el, {
			transition: "none",
			anchor: "#frame-session",
			position: {
				my: "left top",
				at: "left bottom",
				//of: "#frame-logo"
			}
		});
	}
};

session.view("appMenuView", [
	"options",
	"ajaxRequest",
	"appurl",
	session.appMenuView
]);
