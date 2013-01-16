

Settings.EditNavView = Application.View.extend({
	
	initialize: function () {
		var links = this.model.get("navigationLinks");
		this.$("#frame-nav li").each(function (index, item) {
			if (index > links.length - 1) {
				return false;
			}

			$(item).attr({
				"data-pageid": links[index].pageID,
				"data-text": links[index].text
			});
		});
	},
	
	events: {
		"sortupdate #frame-nav ul": function (event, ui) {
			var lis = this.$("#frame-nav .frame-navitem");
			var links = [];
			lis.each(function (index, item) {
				item = $(item);
				links.push({pageID: item.data("pageid"), text: item.data("text")});
			});
			this.model.set("navigationLinks", links);
			this.saveModel();
		},
		
		"click #settings-updatenav-done": "close",
		
		"click .session-addnavitem": function () {
			alert("clicked add");
		}
	},
	
	render: function () {
		var thisView = this;
		
		// sortable nav with Add+
		this.$("#frame-nav ul")
			.append($('<li class="session-addnavitem frame-staticnavitem"><a>Add +</a></li>'))
			.sortable({
				items: "li:not(.frame-staticnavitem)",
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


		// drop target for deletion
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
		
		el.fadeOut(function() {
			var links = view.model.get("navigationLinks");
			links.splice(el.index(), 1);
			view.model.set("navigationLinks", links);
			view.saveModel();
		});
	},
	
	saveModel: function () {

		AjaxRequest.handle(this.model.save());
		
	},
	
	close: function () {
		this.$("#settings-updatenav-done").remove();
		this.$("#settings-updatemsg").html("");
		this.$("#settings-updatenav").attr("disabled", false);
		this.$(".session-addnavitem").remove();
		this.$("#frame-nav ul").sortable("destroy");
		this.$("#frame-body").droppable("destroy");		
	}
});