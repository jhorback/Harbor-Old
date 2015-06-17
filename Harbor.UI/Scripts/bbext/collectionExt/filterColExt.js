/*
 * setFilter(filter)
 *     Calling setFilter will create a source collection from the current models
 *     then filter the collection. The source collection is not meant to be interacted with.
 * 
 *     Adding/removing models on the source collection will not add/remove them from the filtered collection
 *     unless re-filtering.
 * 
 *     Adding/removing items to the filtered collection will add/remove them on the source.
 * 
 * getFiltered(filter)
 *     Returns a new collection based on the filter, and listens to the original collection add/remove events to
 * 	   keep in sync
*/
function filterColExt(mixin, collectionFactory, callbacks) {
	
	var filterColExt = {
		afterInit: function (models, options) {
			if (options && options.filter) {
				this.setFilter(options.filter);
			}
		},

		getFiltered: function (filter, observe) {
			
			var filtered = createNew.call(this, this.filter(filter));
			observe = observe ? observe.join(" ") : "";

			filtered.listenTo(this, "add", function(item, collection, event) {
				filter(item) && filtered.add(item);
			});

			filtered.listenTo(this, "remove", function(item, collection, data) {
				filtered.remove(item);
			});

			filtered.listenTo(this, observe, function (item) {
				filter(item) ? filtered.add(item) : filtered.remove(item);
			});

			filtered.filteredSource = this; // add a pointer back to the source for reference

			return filtered;
		},
		
		setFilter: function (filter) {
			var filtered;

			setupSource.apply(this);
			
			if (!filter) {
				filtered = this.source.models;
			} else {
				filtered = this.source.filter(filter);
			}
			
			this.filter = filter;
			this._sync = true;
			this.set(filtered); // will fire add, remove, merge, events
			this._sync = false;
			return this;
		},
		
		clearFilter: function () {
			this.setFilter(null);
			return this;
		},
		
		// performs a get on all ids and returns
		// a new collection
		getNew: function (ids) {
			var models = [],
			    model,
			    i = ids.length - 1;
			
			while (i >= 0) {
				model = this.get(ids[i]);
				model && models.push(model);
				i--;
			}

			return createNew.call(this, models);
		},
		
		// filters and returns a new collection
		filterNew: function (filter) {
			var models = this.filter(filter);
			return createNew.call(this, models);
		},

		refilter: function() {
			this.setFilter(this.filter);
		}
	};

	function setupSource() {
		if (this.source) {
			return;
		}

		this.source = createNew.call(this, this.models, {
			model: this.model
		});
		
		this.on("all", function (event, model) {
			if (!this._sync && (event === "add" || event === "remove")) {

				// keep the source models in sync
				this.source[event](model);
				
				// apply the filter to new models
				if (event === "add" && this.filter) {
					if (!this.filter(model)) {
						this.remove(model);
					}
				}
			}
		}, this);
	}
	
	function createNew(models, options) {
		return collectionFactory.create(this.name, models, options);
	}

	callbacks.create(filterColExt, "refilter");

	mixin("collection").register("bbext.filterColExt", filterColExt);

}


bbext.config(["mixin", "collectionFactory", "callbacks", filterColExt]);