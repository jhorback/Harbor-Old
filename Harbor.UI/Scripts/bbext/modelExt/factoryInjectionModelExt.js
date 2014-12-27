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
		afterInit: function () {
			this.modelFactory = modelFactory;
			this.collectionFactory = collectionFactory;
		},

		createModel: modelFactory.create,

		createCollection: collectionFactory.create
	};

	mixin("model").register("bbext.associationsModelExt", factoryInjectionModelExt);
	mixin("view").register("bbext.associationsViewExt", factoryInjectionModelExt);
};


bbext.config([
	"mixin",
	"modelFactory",
	"collectionFactory",
	bbext.factoryInjectionModelExt
]);