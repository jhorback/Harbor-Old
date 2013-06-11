/*
 *  viewFactory
 *      get(viewName, options)
 *          - creates a new instance of the view.
 *          - options being the Backbone view options.
 *          - all other arguments required by the view will be injected.
 *                            
 */
module("bbext").service("viewFactory", ["context", function (context) {

	return {
		create: function (viewName, options) {

			return context.instantiate(viewName, [options]);
		}	
	};
}]);

/*
 *  modelFactory
 *      get(modelName, options)
 *          - creates a new instance of the model.
 *          - options being the Backbone model options.
 *          - all other arguments required by the model will be injected.
 *                            
 */
module("bbext").service("modelFactory", ["context", function (context) {

	return {
		create: function (modelName, options) {

			return context.instantiate(modelName, [options]);
		}	
	};
}]);