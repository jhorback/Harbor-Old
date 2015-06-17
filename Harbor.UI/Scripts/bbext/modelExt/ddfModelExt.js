/*
 * Parses the associations and events hashes.
 * 
 * Associations hash:
 *     initialize - optional method to be called on initialization
 *     type - "model" or "collection", default is model.
 *     name - the name of the model or collection (will be a generic model/collection if not defined).
 *     model - the model property of a collection (will be a generic model if not defined).
 *     source - "xhr", "attribute", or null (this will be determined automatically).
 *     url - defines the url property for the model/collection.
 *     query - define this to override the query method.
 *     associations - defines sub associations.
 *
 * query curry:
 *      if the model/collection is determined to have an "xhr" source (if the url property is defined) then a 
 *      query method will be added to the model/collection. This simple calls and returns queryHanlder.fetch(model/collection).
 *
 * generic models/collections
 *      The initial attributes of generic models and initial models of generic collections
 *      are pulled from the root models attribute with the same name of the model/collection
 *
 * options
 *      Each association is created with the same options as the root.
 *      A root property is added to those options for reference.
 *
 * Events hash:
 *
 */
bbext.ddfModelExt = function (
	mixin,
	modelFactory,
	collectionFactory,
	queryHandler,
	events
) {
	var ddfModelExt, createAssocationMethods;

	ddfModelExt = {
		beforeInit: function () {
			forEachAssociation.call(this, "beforeInit", arguments);
			setupEvents.apply(this, arguments);
		},

		afterInit: function() {
			forEachAssociation.call(this, "afterInit", arguments);
		}
	};

	createAssocationMethods = {
		beforeInit: function (name, options, args) {
			var modelOrCollection, modelOrCollectionOptions;


			// determine options
			options.type = options.type || options.model ? "collection" : "model";
			options.source = (options.url || options.query) ? "xhr" : "attribute";
			modelOrCollectionOptions = _.extend({ root: this }, args && args[1]);
			modelOrCollectionOptions.root = this;


			// create the model/collection
			if (options.name) {
				modelOrCollection = options.type === "model" ?
					modelFactory.create(options.name, {}, modelOrCollectionOptions) :
					collectionFactory.create(options.name, {}, modelOrCollectionOptions);
			} else { // generic model
				modelOrCollection = options.type === "model" ?
					modelFactory.createGeneric([], modelOrCollectionOptions) :
					collectionFactory.createGeneric([], modelOrCollectionOptions);	
			}
			modelOrCollection.root = this;
			this[name] = modelOrCollection;
			options.model && (modelOrCollection.model = options.model);
		
		
			// setup the url and query method
			if (options.source === "xhr") {
				if (options.url) {
					modelOrCollection.url = options.url;
				}
				modelOrCollection.query = options.query || function () {
					return queryHandler.fetch(modelOrCollection);
				}
			}


			// parse sub associations
			if (options.type === "model" && options.associations) {
				modelOrCollection.associations = options.associations;
				forEachAssociation.call(modelOrCollection, "beforeInit", args);
				forEachAssociation.call(modelOrCollection, "afterInit", args);
			}


			// call initialize
			options.initialize && options.initialize.apply(modelOrCollection, args);
		},

		// set from root attributes
		afterInit: function (name, options, args) {
			var attrsOrModels = this.attributes[name],
				modelOrCollection = this[name];
		
			if (attrsOrModels) {
				modelOrCollection.set(attrsOrModels);

				this.on("change:" + name, function() {
					modelOrCollection.set(this.get(name));
				});
			}
		}
	};

	function forEachAssociation(method, args) {
		if (!this.associations) {
			return;
		}

		_.each(this.associations, function (assocOptions, name) {
				createAssocationMethods[method].call(this, name, assocOptions, args);
		}, this);
	}

	function setupEvents() {
		var eventName, method;

		if (!this.events) {
			return;
		}

		// hook up the events hash
		for (eventName in this.events) {
			method = this[eventName];
			if (typeof method !== 'function') {
				method = this.events[eventName];
			}
			if (typeof method !== 'function') {
				method = this[this.events[eventName]];
			}
			if (!method) {
				continue;
			}

			this.on(eventName, method, this);
		}

		// listen to and trigger global events
		this.listenTo(events, "all", function () {
			var args = Array.prototype.slice.apply(arguments),
				eventName = args.shift();
			this.trigger.apply(this, "global:" + eventName, args);
		});
	}

	mixin("model").register("bbext.ddfModelExt", ddfModelExt);
};


bbext.config([
	"mixin",
	"modelFactory",
	"collectionFactory",
	"queryHandler",
	"events",
	bbext.ddfModelExt
]);