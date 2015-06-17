/*
Note: If the value set as the collection is not a Backbone collection then
it will be turned into one. If it is a simple array, the model used will have
the value of the array as a 'this' and 'value' property.

this.collection = ["foo", "bar"];

<span data-bind="text: this"></span>
<span data-bind="text: value"></span>
<span>{{value}}</span>

In static binding 'this' points to the window object so only {{value}}
is supported for simple arrays.
*/
var collectionRenderer = function (_, templateCache, viewFactory, modelBinder, viewRenderer, Backbone) {
	"use strict";

	function renderer(view) {
		var templateEl, templateFn;

		this.view = view;
		this.collection = view.collection = ensureBBCollection(view.collection);

		// cache the template for the itemView and set the view el to the parent
		templateFn = templateCache.getTemplateFor(view.name);
		templateEl = templateFn.data.templateEl;

		this.itemViewName = view.itemView || templateEl.data("itemview") || viewFactory.nextGenericName();
		templateCache.cacheTemplateFor(this.itemViewName, templateFn);

		// bind to the collection events
		_.bindAll(this, "addItem", "removeItem", "render", "close");
		view.listenTo(view.collection, "add", this.addItem);
		view.listenTo(view.collection, "remove", this.removeItem);
		view.listenTo(view.collection, "reset sort", this.render);
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

			itemView = viewRenderer.render(this.itemViewName, { model: model });
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
	
	function ensureBBCollection(col) {
		if (col instanceof Backbone.Collection === false) {
			if (col.length > 0 && typeof col[0] === "string") {
				col = _(col).map(function (value) {
					return { "this": value, value: value };
				});
			}
			col = new Backbone.Collection(col);						
		}
		return col;
	}
};


bbext.service("bbext.collectionRenderer", [
	"_", "templateCache", "viewFactory", "modelBinder", "viewRenderer", "Backbone",
	bbext.collectionRenderer = collectionRenderer]);