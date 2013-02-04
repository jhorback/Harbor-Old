Pages.MainView = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
	},
	
	events: {
		"click .page-header button": function () {
			Session.trigger("addPage");
		}
	},
	
	render: function () {
		this.JST("Pages-Main").then(_.bind(function (result) {
			this.$el.html(result);
		}, this));

		this.views("pages", new Pages.PagesView({
			collection: Pages.pages,
			el: $(".pages-list")
		}));
		
		this.views("pages").render();
		return this;
	}
});


Pages.PagesView = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
		this.collection.sortBy(function (item) {
			return new Date(item.get("modified"));
		});
	},
	
	render: function () {
		var el = this.$el;
		this.collection.each(this.renderPage, this);
		return this;
	},
	
	renderPage: function (page) {
		

		var el = this.template("Pages-PageItem")(page.toJSON());
		this.$el.append(el);
		

		return this;
	}
});


