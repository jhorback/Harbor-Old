/*
 *  factory for Backbone objects: view, model, collection.
 *      get(name, options)
 *          - creates a new instance.
 *          - options being the Backbone options.
 *          - all other arguments required by the view will be injected.                       
 */
(function () {
	
	bbext.genericFactory = function (context) {
		return {
			create: function (name, options) {

				return context.instantiate(name, [options]);
			}
		};
	};

	bbext.viewFactory = bbext.genericFactory;
	bbext.modelFactory = bbext.genericFactory;
	bbext.collectionFactory = bbext.genericFactory;

	bbext.service("viewFactory", ["context", bbext.viewFactory]);
	bbext.service("modelFactory", ["context", bbext.modelFactory]);
	bbext.service("collectionFactory", ["context", bbext.collectionFactory]);
}());
