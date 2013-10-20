
function pageAdminView(options, pageRepo, currentUserRepo, pageAdder) {
	
	this.pageRepo = pageRepo;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageAdder = pageAdder;
}


pageAdminView.prototype = {
	
	initialize: function () {
		this.model = {
			pages: this.pageRepo.getPages({
				author: this.currentUser.get("username"),
				orderDesc: "modified"
			})
		};
	},

	addPage: function () {
		this.pageAdder.render();
	},
	
	clickTile: function (event) {
		var target = $(event.target);
		var tile = target.closest(".tile");
		document.location = tile.find("a").attr("href");
	}
};


pageAdmin.view("pageAdminView", [
	"options", "pageRepo", "currentUserRepo", "pageAdder",
	pageAdminView]);