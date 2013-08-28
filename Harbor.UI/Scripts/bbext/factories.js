/*
 *  factory for Backbone objects: view, model, collection.
 *      create(name, options)
 *          - creates a new instance.
 *          - options being the Backbone options.
 *          - all other arguments required by the view will be injected.  
 *
 *       nextGenericName()
 *          - returns a unique name for a potential generic object
 *
 *       createGeneric(options)
 *           - creates a generic instance using the nextGenericName
 *
 *  Note:
 *      Using something like createGeneric(options) over
 *      create("view", options) ensures that the name of the instance
 *      is unique. This is especially important for views since
 *      they rely on their name to find their template.
 */
(function () {

	function createFactory(type) {
		var genericCount = 0;
		
		return function (context) {
			return {
				create: function (name, options) {
					var args = Array.prototype.slice.call(arguments, 0),
					    objName = args.shift(),
					    objType = objName,
					    obj;

					if (objName.indexOf("g-" + type) === 0) {
						objType = type;
					}

					raw = context.get(objType, true);
					// console.log(objType, objName, raw.$inject); // jch! - attempting to get $inject to see if I can massage the model/collection dependencies since their arguments are variant.
					obj = context.instantiate(objType, args);
					obj.name = objName;
					return obj;
				},
				
				nextGenericName: function () {
					return "g-" + type + "-" + genericCount++;
				},
				
				createGeneric: function (options) {
					return this.create(this.nextGenericName(), options);
				}
			};
		};
	}


	bbext.viewFactory = createFactory("view");
	bbext.modelFactory = createFactory("model");
	bbext.collectionFactory = createFactory("collection");

	bbext.service("viewFactory", ["context", bbext.viewFactory]);
	bbext.service("modelFactory", ["context", bbext.modelFactory]);
	bbext.service("collectionFactory", ["context", bbext.collectionFactory]);
}());
