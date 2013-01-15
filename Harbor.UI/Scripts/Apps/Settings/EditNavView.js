

Settings.EditNavView = Application.View.extend({
	
	events: {
		"sortupdate #frame-nav ul": function (event, ui) {
			alert("sort updated!");	
		},
		
		"click #settings-updatenav-done": "close",
		
		"click .session-addnavitem": function () {
			alert("clicked add");
		}
	},
	
	render: function () {
		var thisView = this;
		
		this.$("#frame-nav ul")
			.append($('<li class="session-addnavitem"><a>Add +</a></li>'))
			.sortable({
				items: "li:not(.session-addnavitem)",
				connectWith: "#frame-body",
				tolerance: "pointer",
				revert: true,
				out: function (event, ui) {
					ui.item.addClass("attn");
				},
				over: function (event, ui) {
					ui.item.removeClass("attn");
				},
				stop: function (event, ui) {
					ui.item.removeClass("attn");
				}
			});

//		this.$("#frame-body").sortable({
//			items: "li"
//		});

		// create the drop target for deletion
		this.$("#frame-body").droppable({
			accept: "#frame-nav li",
			tolerance: "fit",
			over: function (event, ui) {
				ui.draggable.addClass("attn");
			},
			out: function (event, ui) {
				ui.draggable.removeClass("attn");			
			},
			deactivate: function (event, ui) {
				ui.draggable.removeClass("attn");			
			},
			drop: function (event, ui) {
				thisView.deleteItem(ui.draggable);
			}			
		});

		// add done button
		this.$("#settings-updatenav").after('<button id="settings-updatenav-done" class="margin-left attn">Done</button>');
		
		// add helper text
		this.$("#settings-updatemsg").html("Drag the navigation to re-arrange and drag down to delete.");
		
		// disable the update button
		this.$("#settings-updatenav").attr("disabled", true);
	},
	
	deleteItem: function (el) {
		var view = this;
		
		// jch! - here - need to make sure the item is deleted from the list
		// track by index??
		el.fadeOut(function() {
			el.remove();
			view.saveOrder();
		});
	},
	
	saveOrder: function () {
		var lis = this.$("#frame-nav li");
		alert(lis.length);
	},
	
	close: function () {
		this.$("#settings-updatenav-done").remove();
		this.$("#settings-updatemsg").html("");
		this.$("#settings-updatenav").attr("disabled", false);
		this.$(".session-addnavitem").remove();
		this.$("#frame-nav ul").sortable("destroy");
		//this.$("#frame-body").sortable("destroy");
		this.$("#frame-body").droppable("destroy");		
	}
});