/*
 *
 * Enables a Backbone collection to have it's model created using the modelFactory
 *
 * Adds if a model or url option exists, moves them to the collection instance.
 * 
 * getIdAttribute() - A method which returns the models idAttribute
 */
bbext.prepareModelColExt = function (context, modelFactory) {

    var setupModel,

        prepareModelColExt = {

            initialize: {
                before: function (attrs, options) {
                    if (options) {
                        if (options.model && !this.model) {
                            this.model = options.model;
                        }

                        if (options.url) {
                            this.url = options.url;
                        }
                    }

                    // do this in initialize as well as modelId
                    // since backbone collections will call the modelId
                    // sometimes before this method gets called.
                    _.isString(this.model) && setupModel(this);
                }
            },

            modelId: {
                before: function () {
                    _.isString(this.model) && 
                        setupModel(this);
                }
            },

            getIdAttribute: function () {
                return this.model.prototype.idAttribute || 'id';
            }
        };

    
    setupModel = function (collection) {
        var rawModel;

        // do this so that calling new collection.model() works
        collection._model = collection.model;
        collection.model = function (attrs, options) {
            return modelFactory.create(collection._model, attrs, options);
        };

        // do this for the collection modelId(attrs) method: this.model.prototype.idAttribute
        rawModel = context.get(collection._model, /*raw*/ true);
        collection.model.prototype = rawModel.prototype;
    };

    return prepareModelColExt;
}


bbext.mixin("prepareModelColExt", [
	"context",
    "modelFactory",
	bbext.prepareModelColExt
]);
