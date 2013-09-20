
// todaysAlbumName
var fileAdmin = context.app("fileAdmin").use(
	"fileModel", "bbext"
);


fileAdmin.start(["app", function (app) {

	app.render({
		regionEl: "#frame-body"
	});

}]);

/* FileAdmin
var FileAdmin = new Application({
	
	root: Session.url("user/files/"),
	routes: {
		"": "main",
		"edit/:id": "editFile",
		"*defaultRoute": "main"
	},
	
	main: function () {
		var view = new FileAdmin.MainView({
			collection: FileAdmin.files
		});
		
		return {
			view: view,
			navigate: "/"
		};
	},
	
	editFile: function (id) {
		var file = FileAdmin.files.find(function (f) {
			return f.get("id") === id;
		});
		
		return {
			view: new FileAdmin.EditView({
				model: file
			}),
			navigate: "edit/" + id
		};
	}
});
*/

/* AlbumsView
events: {
		"click a": function (event) {
			FileAdmin.handleLinkClick(event);
		},
		"click .tile": function (event) {
			FileAdmin.handleLinkClick(event, ".tile");
		}
	},
*/