Session.UserMenu = Application.View.extend({

	initialize: function () {
		this.model = Session.currentUser;
		this.render();
	},

	events: {
		"click #usermenu-addpage": function () {
			var menu;
			Session.trigger("addPage");
			menu = this.view;
			menu && menu.close && menu.close();
		},

		"click #usermenu-uploadfile": function () {
			alert("Upload a file");
		},

		"click #usermenu-signout": function (event) {
			event.preventDefault();
			Session.signOut().then(function () {
				window.location.reload();
			});
		}
	},

	render: function () {
		var $el = this.$el,
			model = this.model;

		var html = this.JST("Session-UserMenu", this.model).then(function (result) {
			$el.html(result);
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
		});

		this.showView(Session.Menu(this.$el, {
			transition: "fade",
			anchor: "#profile-link"
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
});
