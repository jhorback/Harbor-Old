/* 
 * DEPRECATED ******************************
 * 
 * ---> Use a Backbone collection for tabs, fitlerlists, menus, etc.
 *      It's the most flexible and really not hard to do it straight up.
 * 
 *  
 *	menuListFactory.createMenuList(el, options) - side menu page
 *	menuListFactory.createTabList(el, options) - standard inline tabs
 *	menuListFactory.createDetailPageNav(el, options) - detail page tabs
 *	menuListFactory.createFilterList(el, options) - filter list tabs
 *
 *
 *	el - The div to enclose the ul element of the menu list
 *	options:
 *		items - can be one of three things
 *			1. A backbone collection with text, value, disabled, and href properties
 *				- best used when the text is dynamic (i.e. containing counts)
 *			2. An array of objects with text, value, and href properties.
 *			3. An array of strings (used as the text property).
 *
 *			The value and href properties are optional.
 *			The href is only useful for routing, if not provided
 *				the list items will use a 'span' tag rather than an 'a'.
 *
 *
 *		model - a Backbone model that contains an attribute to listen for selection
 *		attr - the name of the attribute to listen for in the model
 *      valueAttribute - An alternate attribute to use for value.
 *
 *	methods:
 *		refresh() - simply reselects the current value.
 *		select(value) - selects the item visually and in the model.
 *		destroy() - removes any created dom elements and event bindings.
 *
 */
function tabFactory (_, appurl, collectionFactory, modelFactory, deprecate) {

    /**
     * A simple object that creates and manages a set of tabs using a backbone model to store state.
     * Tabs are given a "selected" class when set as the active tab.
     * @name TabManager
     */
	var Tabs = function (el, options, listType) {
		this.listType = listType;
		this.isTabs = listType.indexOf("tablist") > -1;
		this.options = options;
        this.parentView = options.parentView;
		this.element = this.parentView ? this.parentView.$(el) : $(el);
		this.options.valueAttribute = this.options.valueAttribute || "value";
		this.items = createItemsModel.call(this, this.options.items);

		this.items.on("change:text change:href change:disabled", render, this);
		this.options.model.on("change:" + this.options.attr, this.refresh, this);

		//this.progress = modelFactory.create("tabFactoryProgressModel", null, {
		//	items: this.items,
		//	model: this.options.model,
		//	modelAttr: this.options.attr
		//});

		render.apply(this);
	};

    /** @extends TabManager.prototype */
	Tabs.prototype = {
        /** refreshes the tab state based on current model state */
		refresh: function () {
			this.select(this.options.model.get(this.options.attr));
		},

        /** marks the tab with the specified values as selected, both in the DOM and in the model */
		select: function (value) {
			var item = this.element.find("[data-value='" + value + "']");
			this.element.find(".selected").removeClass("selected");
			this.options.model.set(this.options.attr, value);
			if (this.isTabs) {
				item.find(".tablist-item").addClass("selected");
			} else {
				item.find(".lineitem").addClass("selected");
			}
		},

        /** Destroys the tab list and stops listening for all model events related to this list */
		destroy: function () {
			this.element.empty();
			this.options.model.off(null, null, this);
		}
	};

	function render() {
		var dataItemEl;

		// jch* - render tabs
		// 	• if item is disabled need to not add a link and no event click handler
		// console.warn("RENDERING");

		this.element.empty();
		this.element.addClass(this.listType).append('<ul/>');
		this.listEl = this.element.find("ul");
		this.items.each(function (dataItem) {
			dataItemEl = $('<li data-value="' + dataItem.attributes[this.options.valueAttribute] + '"></li>');
			if (dataItem.attributes.href && (dataItem.get("disabled") !== true)) {
				if (this.isTabs) {
					dataItemEl.append('<a class="tablist-item" href="' + appurl.get(dataItem.attributes.href) + '">' + dataItem.attributes.text + '</a>');
				} else {
					dataItemEl.append('<a class="lineitem" href="' + appurl.get(dataItem.attributes.href) + '"><span class="lineitem-content">' + dataItem.attributes.text + '</span></a>');
				}
				dataItemEl.find("a").on("click", clickItem(this));
			} else {
				if (this.isTabs) {
					dataItemEl.append('<span class="tablist-item" tabindex="0">' + dataItem.attributes.text + '</span>');
				} else {
					dataItemEl.append('<span class="lineitem" tabindex="0">' + dataItem.attributes.text + '</span>');
				}

			    if (dataItem.get("disabled") === true) {
			        dataItemEl.addClass("disabled");
			    } else {
			        dataItemEl.on("click", clickItem(this)).on("keypress", keyPress);
			    }
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
				dataItem = { text: dataItem };
				dataItem[this.options.valueAttribute] = dataItem.text;

			}
			if (!dataItem[this.options.valueAttribute]) {
				dataItem[this.options.valueAttribute] = dataItem.text;
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

    /** @returns function */
	function createTabsCurry(className) {
        /** @returns TabManager */
		return function (el, options) {
			return new Tabs(el, options, className);
		}
	}

    /** @name bbext.tabFactory */
	return {

        /** this is for the side page menu (to be used now more for settings style pages) */
		createMenuList: createTabsCurry("menulist"),

        /** This is for the standard inline horizontal tabs */
		createTabList: createTabsCurry("tablist"),

        /** Another horizontal tab list, but for primary page navigation on the detail pages */
		createDetailPageNav: createTabsCurry("detailpage-tabs tablist"),

        /** Creates a vertical simple list for page filters */
		createFilterList: createTabsCurry("menulist condensed")
	};
}

bbext.service("tabFactory", [
	"_",
	"appurl",
	"collectionFactory",
	"modelFactory",
	"deprecate",
	tabFactory
]);
