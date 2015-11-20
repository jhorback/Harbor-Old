/*
 * Adds the model and collection factories to all models along with
 *     first class creation methods for convenience.
 *
 * model.createModel(...)
 * model.createCollection(...)
 *
 */
bbext.commonBackboneObjectExt = function (
	modelFactory,
	collectionFactory,
	appurl
) {

	var commonBackboneObjectExt = {
		ctor: {
			before: function () {
				this.modelFactory = modelFactory;
				this.collectionFactory = collectionFactory;
				this.options = this.options || arguments[0];
			}
		},

		bindAll: function (methodNames) {
			var args = Array.prototype.slice.apply(arguments);
			args.unshift(this);
			_.bindAll.apply(_, args);
		},

		createModel: modelFactory.create,

		createCollection: collectionFactory.create,

		appurl: appurl.get
	};

	return commonBackboneObjectExt;
};


bbext.mixin("commonBackboneObjectExt", [
	"modelFactory",
	"collectionFactory",
	"appurl",
	bbext.commonBackboneObjectExt
]);
