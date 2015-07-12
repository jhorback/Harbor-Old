
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
		if (this.model.attributes.selectedMenuItemId === menuItem.id) {
			return;
		}
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
		var body = $("body");

		this.overlay = $('<div class="overlay"/>');
		body.append(this.overlay.show());
		body.append(this.$el);
		this.$el.addClass("open");
		
		this.overlay.on("click", _.bind(function () {
			this.closeMenu();
		}, this));
	},

	closeMenu: function () {
		this.$el.removeClass("open");
		this.close();
		this.overlay && this.overlay.remove();
	},

	onClose: function () {
		// debugger;
	}
};

session.view("appMenuView", [
	"options",
	"ajaxRequest",
	"appurl",
	session.appMenuView
]);
