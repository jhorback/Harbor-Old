Pages.MainView = Application.View.extend({
	events: {
		"click .page-header button": function () {
			Session.trigger("page:add");
		},
		"click .tile": function (event) {
			var target = $(event.target);
			var tile = target.closest(".tile");
			document.location = tile.find("a").attr("href");
		}
	},
	
	render: function () {
		this.JST("Pages-Main").then(_.bind(function (result) {
			this.$el.html(result);
		}, this));

		this.showView(new Pages.PagesView({
			collection: Pages.pages,
			el: $(".pages-list")
		}));
		
		this.view.render();
		return this;
	},
	
	showView: function (view) {
		this.view && this.view.close();
		this.view = view;
	},
	
	onClose: function () {
		this.view && this.view.close();
	}
});


Pages.PagesView = Application.View.extend({
	initialize: function () {
		this.collection.sortBy(function (item) {
			return new Date(item.get("modified"));
		});
	},
	
	render: function () {
		this.collection.each(this.renderPage, this);
		return this;
	},
	
	renderPage: function (page) {
		var el = this.template("Pages-PageItem")(page.toJSON());
		this.$el.append(el);
	}
});
