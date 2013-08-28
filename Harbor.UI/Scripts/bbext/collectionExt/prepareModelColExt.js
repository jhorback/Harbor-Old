


function prepareModelColExt(Backbone) {
	var extension;

	extension = {
		// replaceing _prepareModel so I can use the modelFactory to create the model.
		_prepareModel: function (attrs, options) {
			if (attrs instanceof Backbone.Model) {
				if (!attrs.collection) attrs.collection = this;
				return attrs;
			}
			options || (options = {});
			options.collection = this;

			// var model = new this.model(attrs, options);
			var model = createModel(this, attrs, options);

			if (!model._validate(attrs, options)) {
				this.trigger('invalid', this, attrs, options);
				return false;
			}
			return model;
		}
	};

	var createModel = function (collection, attrs, options) {
		var modelFactory;

		if (typeof collection.model !== "string") {
			return new collection.model(attrs, options);
		}
		
		modelFactory = collection.context.get("modelFactory");
		return modelFactory.create(collection.model, attrs, options);
	};
	
	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};
}

bbext.service("bbext.prepareModelColExt", ["Backbone", bbext.prepareModelColExt = prepareModelColExt]);