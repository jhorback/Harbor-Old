
function pageAdminView(options, pageRepo, currentUserRepo) {
	
	this.pageRepo = pageRepo;
	this.currentUser = currentUserRepo.getCurrentUser();
	
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
					author: this.currentUser.get("username"),
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


pageAdmin.view("pageAdmin", ["options", "pageRepo", "currentUserRepo", pageAdminView]);