


function prepareModelColExt(Backbone, mixin) {

	var prepareModelColExt = {
		// replaceing _prepareModel so I can use the modelFactory to create the model.
		_prepareModel: function (attrs, options) {
			if (attrs instanceof Backbone.Model) {
				if (!attrs.collection) attrs.collection = this;
				return attrs;
			}
			options || (options = {});
			options.collection = this;

			// this is the only change from Backbone.Collection._prepareModel
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
	
	mixin("collection").register("bbext.prepareModelColExt", prepareModelColExt);
}


bbext.config(["Backbone", "mixin", prepareModelColExt]);
