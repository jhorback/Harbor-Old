/*
	menuListFactory.create(el, options);

	el - The root ul element of the menu list
	options:
		items - can be one of three things
			1. A backbone collection with text, value, disabled, and href properties
				- best used when the text is dynamic (i.e. containing counts)
			2. An array of objects with text, value, and href properties.
			3. An array of strings (used as the text property).

			The value and href properties are optional.
			The href is only useful for routing, if not provided
				the list items will use a 'span' tag rather than an 'a'.
		
	
		model - a Backbone model that contains an attribute to listen for selection
		attr - the name of the attribute to listen for in the model

	methods:
		refresh() - simply reselects the current value.
		select(value) - selects the item visually and in the model.
		destroy() - removes any created dom elements and event bindings.
		
*/
function tabFactory (_, appurl, collectionFactory, modelFactory) {
	
	var Tabs = function (el, options, listType) {
		this.listType = listType;
		this.element = $(el);
		this.options = options;
		this.items = createItemsModel(this.options.items);

		this.items.on("change:text", render, this);
		this.items.on("change:disabled", render, this);
		this.options.model.on("change:" + this.options.attr, this.refresh, this);

		this.progress = modelFactory.create("tabFactoryProgressModel", null, {
			items: this.items,
			model: this.options.model,
			modelAttr: this.options.attr
		});

		render.apply(this);
	};

	Tabs.prototype = {
		refresh: function () {
			this.select(this.options.model.get(this.options.attr));
		},
	
		select: function (value) {
			var item = this.element.find("[data-value='" + value + "']");
			this.element.find(".selected").removeClass("selected");
			this.options.model.set(this.options.attr, value);
			item.addClass("selected");
		},
		
		destroy: function () {
			this.element.empty();
			this.options.model.off(null, null, this);
		}
	};

	function render() {
		var dataItemEl;

		// jch! - render tabs
		// 	• if item is disabled need to not add a link and no event click handler
		console.warn("RENDERING");

		this.element.empty();
		this.element.addClass(this.listType).append('<ul/>');
		this.listEl = this.element.find("ul");
		this.items.each(function (dataItem) {
			dataItemEl = $('<li data-value="' + dataItem.attributes.value + '"></li>');
			if (dataItem.attributes.href) {
				dataItemEl.append('<a href="' + appurl.get(dataItem.attributes.href) + '">' + dataItem.attributes.text + '</a>');
				dataItemEl.find("a").on("click", clickItem(this));
			} else {
				dataItemEl.append('<span tabindex="0">' + dataItem.attributes.text + '</span>');
				dataItemEl.on("click", clickItem(this)).on("keypress", keyPress);
			}
			
			if (dataItem.get("disabled") === true) {
				dataItemEl.addClass("disabled");
			}
			this.listEl.append(dataItemEl);


		}, this);
		
		this.refresh();
	}
	
	function createItemsModel(items) {
		var itemsCol, dataItem, i = 0;

		if (items instanceof Backbone.Collection) {
			return items;
		}

		itemsCol = collectionFactory.createGeneric([]);
		for (; i < items.length; i++) {
			dataItem = items[i];
			if (!dataItem.text) {
				dataItem = { text: dataItem, value: dataItem };
			}
			if (!dataItem.value) {
				dataItem.value = dataItem.text;
			}
			itemsCol.add(dataItem);
		}

		return itemsCol;
	}

	function clickItem(menu) {
		return function (event) {
			var target = $(event.target).closest("li"),
			    value = target.data("value");

			event.preventDefault();
			menu.select(value);
		};
	}
	
	// enter or space bar selects
	function keyPress(event) {
		var target = $(event.target).closest("li");
		if (event.which == 13 || event.which == 32) {
			target.click();
		}
	}
	
	return {
		createMenuList: function (el, options) {
			return new Tabs(el, options, "menulist");
		},
		createTabList: function (el, options) {
			return new Tabs(el, options, "tablist");
		}
	};
};

bbext.service("tabFactory", [
	"_",
	"appurl",
	"collectionFactory",
	"modelFactory",
	tabFactory
]);
