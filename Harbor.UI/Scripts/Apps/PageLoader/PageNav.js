
PageLoader.PageNav = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
		this.model.on("change", this.update, this);
	},
	
	events: {
		"click #pageloader-edit": function () {
			this.model.set("mode", "edit");
		},
		
		"click #pageloader-settings": function () {
			this.model.set("mode", "settings");
		},
		
		"click #pageloader-done": function () {
			this.model.set("mode", "view");
		}
	},

	render: function () {
		var self = this;
		
		this.JST("PageLoader").then(function (result) {
			self.$el.html(result);
			self.update();
		});
	},
	
	update: function () {
		var mode = this.model.get("mode"),
			doneBtn = this.$("#pageloader-done"),
			editBtn = this.$("#pageloader-edit"),
			settingsBtn = this.$("#pageloader-settings");
		
		var action = {
			"view": function () {
				doneBtn.hide();
				settingsBtn.removeClass("selected");
				editBtn.removeClass("selected");
			},
			"edit": function () {
				doneBtn.show();
				editBtn.addClass("selected");
				settingsBtn.removeClass("selected");				
			},
			"settings": function () {
				doneBtn.show();			
				editBtn.removeClass("selected");
				settingsBtn.addClass("selected");
			}
		};

		action[mode]();
	}
});