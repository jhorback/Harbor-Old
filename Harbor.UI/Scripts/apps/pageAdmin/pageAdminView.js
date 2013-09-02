
function pageAdminView(options, pageRepo) {
	
	this.pageRepo = pageRepo;

}


pageAdminView.prototype = {
	
	initialize: function () {
		/* jch! - how to sort here?? whats the best way?
			this.collection.sortBy(function (item) {
			return new Date(item.get("modified"));
		});*/
		
		this.model = {
			pages: this.pageRepo.getPages({
				data: {
					author: Session.currentUser.get("username"), // jch* - [sessionModel]/this.currentUser.get("username");
					orderDesc: "modified"
				}
			})
		};
	},

	addPage: function () {
		Session.trigger("page:add"); // jch* pageAdder.render();
	},
	
	clickTile: function (event) {
		var target = $(event.target);
		var tile = target.closest(".tile");
		document.location = tile.find("a").attr("href");
	}
};


pageAdmin.view("pageAdmin", ["options", "pageRepo", pageAdminView]);