var FileAdmin = new Application({

	uploadTargetId: null, // to be passed in as an option to start
	
	files: null, // holds the FileModel collection
	
	root: Session.url("user/files/"),
	
	routes: {
		"": "main",
		"edit/:id": "editFile",
		"*defaultRoute": "main"
	},
	
	regions: {
		"default": "#frame-body",
		"upload": function () {
			return "#" + this.uploadTargetId;
		}
	},
	
	start: function (options) {

		this.uploadTargetId = FileAdmin.slugify(options.todaysAlbumName);
		
		FileAdmin.files = new FileAdmin.Files();
		FileAdmin.files.fetch();
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
		debugger;
		var file = FileAdmin.files.find(function (f) {
			return f.get("id") === id;
		});
		
		return {
			view: new FileAdmin.EditView({
				model: file
			}),
			navigate: "edit/" + id
		};
	},
	
	slugify: function (text) {
		text=text.replace(/[^-a-zA-Z0-9,&\s]+/ig,'');
		text=text.replace(/-/gi,"_");
		text=text.replace(/\s/gi,"-");
		return text;
	},

	stop: function () {
		
	}
});

FileAdmin.Files = Backbone.Collection.extend({
	url: Application.url("api/files"),
	model: FileModel
});