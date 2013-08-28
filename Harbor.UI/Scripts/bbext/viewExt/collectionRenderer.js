
var collectionRenderer = function (_, templateCache, viewFactory, modelBinder) {
	"use strict";

	function renderer(view) {
		var templateEl, templateFn;

		this.view = view;
		this.viewRenderer = view.context.get("viewRenderer");
		this.collection = view.collection;
		

		// cache the template for the itemView and set the view el to the parent
		templateFn = templateCache.getTemplateFor(view.name);
		templateEl = templateFn.data.templateEl;

		this.itemViewName = view.itemView || templateEl.data("itemview") || viewFactory.nextGenericName();
		templateCache.cacheTemplateFor(this.itemViewName, templateFn);

		// bind to the collection events
		_.bindAll(this, "addItem", "removeItem", "render");
		view.listenTo(view.collection, "add", this.addItem);
		view.listenTo(view.collection, "remove", this.removeItem);
		view.listenTo(view.collection, "reset", this.render);
	}

	renderer.prototype = {
		render: function () {
			
			this.empty();

			this.collection.each(function (model) {
				this.addItem(model);
			}, this);

			modelBinder.updateEl(this.view.$el);
		},

		addItem: function (model) {
			var index = this.collection.indexOf(model),
				itemAtIndex,
				itemView;


			itemAtIndex = this.view.$el.children().eq(index);

			itemView = this.viewRenderer.render(this.itemViewName, { model: model });
			itemView.$el.attr("data-cid", model.cid);
			this.view.views.add(itemView);
			
			itemView.$el.data("view", itemView);
			if (itemAtIndex.length === 0) {
				this.view.$el.append(itemView.$el);
			} else {
				itemAtIndex.before(itemView.$el);
			}
		},

		removeItem: function (model) {
			var el = this.view.$("[data-cid='" + model.cid + "']"),
				itemView = el.data("view");
			
			el.remove();
			this.view.views.remove(itemView);
		},

		empty: function () {
			this.view.views.remove();
			this.view.$el.empty();
		},

		close: function () {
			this.empty();
		}
	};

	return {
		render: function (view) {
			var thisRenderer = new renderer(view);
			thisRenderer.render();
			view.on("close", thisRenderer.close);
		}
	};
};


bbext.service("bbext.collectionRenderer", [
	"_", "templateCache", "viewFactory", "modelBinder",
	bbext.collectionRenderer = collectionRenderer]);