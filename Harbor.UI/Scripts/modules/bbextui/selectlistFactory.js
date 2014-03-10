/* 
 * Description:
 *     Use to create a selectlist jquery ui widget.
 *
 * Additional options:
 *     collection - if a collection option is passed in, the selected values will be
 *         syncronized with a "selected" property on models in the collection.
 *
 * Adapter methods:
 *     clear() - clears the selection
 *     destroy() - removes the widget and collection binding
 *     getValues() - returns an array of values
 *     setValues(values) - sets the array of values
 *     getValue() - returns the first value
 *     setValue(value) - ensures the value is the only one selected
 *
 */
bbext.selectlistFactory = function (_) {
	return {
		create: function (el, options) {

			el.selectlist(options);

			if (options && options.collection) {
				bindCollection(el, options.collection);
			}

			return {				
				clear: function () {
					el.selectlist("clear");
				},
				
				destroy: function () {
					el.selectlist("destroy");
					if (options && options.collection) {
						options.collection.unbind("change:selected", collectionSelectionChanged);
						el.unbind("selectlistchange", selectlistSelectionChanged);
					}
				},

				getValues: function () {
					return el.selectlist("values");
				},

				setValues: function (values) {
					this.clear();
					_.each(values, function (value) {
						el.selectlist("select", value, true);
					}, this);
				},

				getValue: function () {
					var values = this.getValues();
					return values && values[0];
				},

				setValue: function (value) {
					this.setValues([value]);
				}
			};
		}
	};

	function bindCollection(el, collection) {
		var eventContext = {
			el: el,
			collection: collection
		};

		collection.on("change:selected", collectionSelectionChanged, eventContext);
		el.on("selectlistvaluechange", _.bind(selectlistSelectionChanged, eventContext));

		//collection.each(function (model) {
		//	el.selectlist("select", model.get("id"), model.get("selected"));
		//});
	}

	function collectionSelectionChanged(model) {
		var isSelected = model.get("selected") ? true : false,
		    value = model.get(this.collection.getIdAttribute());

		this.el.selectlist("select", value, isSelected);
	}

	function selectlistSelectionChanged(event, info) {
		var criteria = {},
		    idAttribute = this.collection.getIdAttribute(),
		    model;

		criteria[idAttribute] = info.value;
		model = this.collection.findWhere(criteria);
		model && model.set("selected", info.checked);
	}
};

bbext.service("selectlistFactory", [
	"_",
	bbext.selectlistFactory
]);
