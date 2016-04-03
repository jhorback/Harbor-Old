
/*
 Provides knowledge of an injected model to the Backbone collection.

 Also provides a getIdAttribute() method.
*/

bbext.prepareModelColExt = function (context) {

	var prepareModelColExt = {
		ctor: {
			before: function (options) {
				// set the model if defined as a string in options
				// useful for generic collections with specific models
				if (options && options.model && !this.model) {
					this.model = options.model;
				}
			}	
		},

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
		},

		getIdAttribute: function () {
			return (this.models[0] && this.models[0].idAttribute) || "id";
		}
	};

	var createModel = function (collection, attrs, options) {
		var modelFactory;

		if (typeof collection.model !== "string") {
			return new collection.model(attrs, options);
		}
		
		modelFactory = context.get("modelFactory");
		return modelFactory.create(collection.model, attrs, options);
	};
	
	return prepareModelColExt;
}


bbext.mixin("prepareModelColExt", [
	"context",
	bbext.prepareModelColExt
]);
