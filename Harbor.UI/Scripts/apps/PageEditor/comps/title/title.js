
var title = module("title").use("pageComponent", "bbext");

title.pageComponent("title", function (viewFactory) {

	this.viewFactory = viewFactory;
	
}, {
	$inject: ["viewFactory"],
	
	create: function () {
		this.open();
	},

	open: function () {
		this.view = this.viewFactory.create("titleView", {
			model: this.page,
			$el: this.$el
		});
		this.view.render();
	},

	close: function () {
		this.view.close();
	}
});


title.view("titleView", function (options, jstViewExtension) {
	jstViewExtension.extend(this);
}, {
	$inject: ["options", "jstViewExtension"],
	render: function () {
		this.bindTemplate("Comps-Title");
	}
});