/*
	menuListFactory.create(el, options);

	el - The root ul element of the menu list
	options:
		items - can be one of three things
			1. A backbone collection with text, value, and href properties
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
function tabFactory (_, appurl) {
	
	var Tabs = function (el, options, listType) {
		this.listType = listType;
		this.element = $(el);
		this.options = options;
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
		var i = 0,
		    items = this.options.items,
		    dataItem,
		    dataItemEl;

		this.element.empty();
		this.element.addClass(this.listType).append('<ul/>');
		this.listEl = this.element.find("ul");
		for (; i < items.length; i++) {
			dataItem = items[i];
			if (!dataItem.text) {
				dataItem = { text: dataItem, value: dataItem };
			}
			if (!dataItem.value) {
				dataItem.value = dataItem.text;
			}
			dataItemEl = $('<li data-value="' + dataItem.value + '"></li>');
			if (dataItem.href) {
				dataItemEl.append('<a href="' + appurl.get(dataItem.href) + '">' + dataItem.text + '</a>');
				dataItemEl.find("a").on("click", clickItem(this));
			} else {
				dataItemEl.append('<span tabindex="0">' + dataItem.text + '</span>');
				dataItemEl.on("click", clickItem(this)).on("keypress", keyPress);
			}
			this.listEl.append(dataItemEl);
		}

		this.refresh();
		this.options.model.on("change:" + this.options.attr, this.refresh, this);
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
		// console.log(event.which);
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
	tabFactory
]);