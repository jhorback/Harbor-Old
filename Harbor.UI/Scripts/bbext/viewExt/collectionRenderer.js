
var collectionRenderer = function (_, templateCache) {
	"use strict";

	function renderer(view) {
		var templateEl, templateFn;

		this.view = view;
		this.viewRenderer = view.context.get("viewRenderer");
		this.itemViewName = view.itemView || "bbext.genericView";
		this.collection = view.collection;
		

		// cache the template for the itemView and set the view el to the parent
		templateFn = templateCache.getTemplateFor(view.name);
		templateEl = templateFn.data.templateEl;
		templateCache.cacheTemplateFor(this.itemViewName, templateFn);
		view.setElement(templateEl.parent());


		// bind to the collection events
		_.bindAll(this, "addItem", "removeItem", "render");
		view.listenTo(view.collection, "add", this.addItem);
		view.listenTo(view.collection, "remove", this.removeItem);
		view.listenTo(view.collection, "reset", this.render);
	}

	renderer.prototype = {
		render: function () {
			
			// jch! clean up children
			this.view.$el.empty();

			this.collection.each(function (model) {
				this.addItem(model);
			}, this);
		},

		addItem: function (model) {
			var index = this.collection.indexOf(model),
				itemAtIndex,
				itemView;


			itemAtIndex = this.view.$el.children().eq(index);

			// jch! would add the child - this.views.add(
			itemView = this.viewRenderer.render(this.itemViewName, { model: model });
			itemView.$el.attr("data-cid", model.cid);

			if (itemAtIndex.length === 0) {
				this.view.$el.append(itemView.$el);
			} else {
				itemAtIndex.before(itemView.$el);
			}
		},

		removeItem: function (model) {
			var el = this.view.$("[data-cid='" + model.cid + "']");
			el.remove();
			// jch! will want to find the view and remove/close that too
		},

		close: function () {

		}
	};

	return {
		render: function (view) {
			var viewRenderer = new renderer(view);
			viewRenderer.render();
			view.on("close", viewRenderer.close);
		}
	};
};


bbext.service("bbext.collectionRenderer", [
	"_", "templateCache",
	bbext.collectionRenderer = collectionRenderer]);