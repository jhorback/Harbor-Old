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

		return function (context, console) {
			return {
				create: function (name, options) {
					var args = Array.prototype.slice.call(arguments, 0),
					    objName = args.shift(),
					    objType = objName,
					    obj;

					if (objName.indexOf("g-" + type) === 0) {
						objType = type;
					}

					args = guardArgs(objType, args);

					console.log("MVCoR Factory", type, "creating", objType, ":", objName, "for app:", context.name);
					obj = context.instantiate(objType, args);
					obj.name = objName;
					return obj;
				},

				nextGenericName: function () {
					return "g-" + type + "-" + genericCount++;
				},

				createGeneric: function (options) {
					var args = Array.prototype.slice.call(arguments, 0);
					args.unshift(this.nextGenericName());
					return this.create.apply(this, args);
				}
			};

			function guardArgs(objType, args) {
				var raw, inject,
					i = 0,
					expected = [];

				raw = context.get(objType, true);
				inject = raw.$inject || raw.prototype.$inject;
				if (!inject || inject.length === 0) {
					return args;
				}

				if (type === "view") {
					expected = ["options"];
				} else if (type === "model") {
					expected = ["attrs", "options"];
				} else if (type === "collection") {
					expected = ["models", "options"];
				}

				for (; i < expected.length; i++) {
					if (args[i] === undefined) {
						args[i] = null;
					}
					if (expected[i] !== inject[i]) {
						console.warn("Argument warning for " + type + " " + objType +
							". Injected arguments should start with: [" + expected +
							"]. Actual inject is: [" + inject + "]");
					}
				}
				return args;
			}
		};
	}



	bbext.viewFactory = createFactory("view");
	bbext.modelFactory = createFactory("model");
	bbext.collectionFactory = createFactory("collection");

	bbext.service("viewFactory", ["context", "console", bbext.viewFactory]);
	bbext.service("modelFactory", ["context", "console", bbext.modelFactory]);
	bbext.service("collectionFactory", ["context", "console", bbext.collectionFactory]);
}());
