
session.appMenuView = function (
	options,
	ajaxRequest,
	appurl,
	timer
) {
	this.ajaxRequest = ajaxRequest;
	this.appurl = appurl;
	this.timer = timer;
};

session.appMenuView.prototype = {
	initialize: function () {
		this.bindAll("close");
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

		this.timer.transitionTo(this.$el, "open");
		
		this.overlay.on("click", _.bind(function () {
			this.closeMenu();
		}, this));
	},

	closeMenu: function () {
		this.timer.transitionFrom(this.$el, "open").then(this.close);
	},

	onClose: function () {
		this.overlay && this.overlay.remove();
	}
};

session.view("appMenuView", [
	"options",
	"ajaxRequest",
	"appurl",
	"timer",
	session.appMenuView
]);
