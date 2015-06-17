/*
 * Adds the model and collection factories to all models along with
 *     first class creation methods for convenience.
 *
 * model.createModel(...)
 * model.createCollection(...)
 * 
 */
bbext.factoryInjectionModelExt = function (
	mixin,
	modelFactory,
	collectionFactory
) {

	var factoryInjectionModelExt = {
		bindAll: function (methodNames) {
			var args = Array.prototype.slice.apply(arguments);
			args.unshift(this);
			_.bindAll.apply(_, args);
		},

		beforeInit: function () {
			this.modelFactory = modelFactory;
			this.collectionFactory = collectionFactory;
		},

		createModel: modelFactory.create,

		createCollection: collectionFactory.create
	};

	mixin("model").register("bbext.factoryInjectionModelExt", factoryInjectionModelExt);
};


bbext.config([
	"mixin",
	"modelFactory",
	"collectionFactory",
	bbext.factoryInjectionModelExt
]);