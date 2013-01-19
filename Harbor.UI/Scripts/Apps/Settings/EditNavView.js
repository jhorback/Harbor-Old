

Settings.EditNavView = Application.View.extend({
	
	initialize: function () {
		var links = this.model.get("navigationLinks"),
			view = this;
		
		this.$("#frame-nav li").each(function (index, item) {
			if (index > links.length - 1) {
				return false;
			}
			view.addDataAttrsToNavItem(item, links[index]);
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
			this.selectPageToAdd();
		}
	},
	
	addDataAttrsToNavItem: function (item, link) {
		$(item).attr({
			"data-pageid": link.pageID,
			"data-text": link.text
		});
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
	
	selectPageToAdd: function () {
		// assumes PageSelector is already loaded
		Settings.regions.main.hideEl();	
		PageSelector.open({
			region: new Region("#settings-modal"),
			close: function () {
				Settings.regions.main.showEl();
			},
			select: function (selectedPage) {
				var links = this.model.get("navigationLinks"),
					template = '<li class="frame-navitem"><a href="{{link}}">{{title}}</a></li>',
					pageID = selectedPage.get("id"),
					text = selectedPage.get("title"),
					newLi = _.template(template)({
						link: PageModels.getPageUrl(pageID, text),
						title: text
					}),
					link = {
						pageID: pageID,
						text: text
					};

				newLi = $(newLi);
				this.addDataAttrsToNavItem(newLi, link);
				newLi.hide();
				this.$("#frame-nav li.frame-staticnavitem:eq(0)").before(newLi);
				newLi.fadeIn();
				
				links.push(link);
				this.model.set("navigationLinks", links);
				this.saveModel();
			}
		}, this);
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