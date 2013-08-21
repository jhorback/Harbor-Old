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
				var args = Array.prototype.slice.call(arguments, 0),
				    viewName = args.shift();

				return context.instantiate(viewName, args);
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
