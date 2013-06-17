
PageLoader.PageNav = Application.View.extend({
	initialize: function () {
		this.model.on("change", this.update, this);
	},
	
	events: {
		"click #pageloader-edit": function () {
			this.model.set("mode", "edit");
		},
		
		"click #pageloader-settings": function () {
			debugger;
		    PageLoader.settings();
		},
		
		"click #pageloader-done": function () {
			this.model.set("mode", "view");
		}
	},

	render: function () {
		this.renderTemplate("PageLoader")();
		this.update();
	},
	
	update: function () {
	    var mode = this.model.get("mode"),
			doneBtn = this.$("#pageloader-done"),
			editBtn = this.$("#pageloader-edit");
		
		var action = {
		    "view": function () {
				doneBtn.hide();
				editBtn.removeClass("selected");
			},
			"edit": function () {
				doneBtn.show();
				editBtn.addClass("selected");			
			}
		};

		action[mode]();
	}
});