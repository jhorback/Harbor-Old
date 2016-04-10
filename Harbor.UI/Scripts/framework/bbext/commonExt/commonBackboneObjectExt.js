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

                // could move into it's own mixin;
				if (this.constructor.$inject) {
				    addInjectedProperties.call(this, arguments);
				}
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

	function addInjectedProperties(deps) {
	    var inject = this.constructor.$inject,
            namedDependency,
            i = 0;

	    for (; i < inject.length; i++) {
	        namedDependency = inject[i];
	        if (this[namedDependency] === void (0)) {
	            this[namedDependency] = deps[i];
	        }
	    }
	}

	return commonBackboneObjectExt;
};


bbext.mixin("commonBackboneObjectExt", [
	"modelFactory",
	"collectionFactory",
	"appurl",
	bbext.commonBackboneObjectExt
]);
