

Settings.EditNavView = Application.View.extend({
	
	events: {
		"click #settings-updatenav-done": "close",
		
		"click .session-addnavitem": function () {
			alert("clicked");
		}
	},
	
	render: function () {
		
		var frameNav = this.$("#frame-nav ul");
		
		var addItem = $('<li class="session-addnavitem"><a>Add +</a></li>');
		frameNav.append(addItem);
		frameNav.sortable({
			//grid: [20, 10]
		});
		
		/*
		add a class to the #frame-nav to denote editing
		position an + sign for add next to the #frame-nav
		drag down for delete

		disable the #settings-updatenav button
		*/


		// add done button
		this.$("#settings-updatenav").after('<button id="settings-updatenav-done" class="margin-left attn">Done</button>');
		
		// add helper text
		this.$("#settings-updatemsg").html("Drag the navigation to re-arrange and drag down to delete.");
		
		// disable the update button
		this.$("#settings-updatenav").attr("disabled", true);
	},
	
	close: function () {
		this.$("#settings-updatenav-done").remove();
		this.$("#settings-updatemsg").html("");
		this.$("#settings-updatenav").attr("disabled", false);
		this.$(".session-addnavitem").remove();
	}
});