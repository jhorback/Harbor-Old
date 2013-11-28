/*
	menuListFactory.create(el, options);

	el - The root ul element of the menu list
	options:
		items - array of strings or an array objects with text, optional value and href properties
		        appurl will be used on the href if provided
		model - a Backbone model that contains an attribute to listen for
		attr - the name of the attribute to listen for in the model
*/
function menuListFactory (appurl) {
	
	var SelectableList = function (el, options) {
		this.element = $(el);
		this.options = options;
		render.apply(this);
	};

	SelectableList.prototype = {
		refresh: function () {
			this.select(this.options.model.get(this.options.attr));
		},
	
		select: function (value) {
			var item = this.element.find("[data-value='" + value + "']");
			this.element.find(".selected").removeClass("selected");
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
		this.element.addClass("menulist").append('<ul/>');
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
			menu.options.model.set(menu.options.attr, value);
		};
	}
	
	// enter or space bar selects
	function keyPress(event) {
		var target = $(event.target).closest("li");
		console.log(event.which);
		if (event.which == 13 || event.which == 32) {
			target.click();
		}
	}
	
	return {
		create: function (el, options) {
			return new SelectableList(el, options);
		}
	};
};

bbext.service("menuListFactory", [
	"appurl",
	menuListFactory
]);