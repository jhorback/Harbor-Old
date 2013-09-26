/*
Calling setFilter will create a source collection from the current models
then filter the collection. The source collection is not meant to be interacted with.

Adding/removing models on the source collection will not add/remove them from the filtered collection
unless re-filtering.

Adding/removing items to the filtered collection will add/remove them on the source.
*/
function filterColExt(mixin, collectionFactory) {
	
	var filterColExt = {
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
		}
	};

	function setupSource() {
		if (this.source) {
			return;
		}

		this.source = collectionFactory.create(this.name, this.models);

		
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

	mixin("collection").register("bbext.filterColExt", filterColExt);

}


bbext.config(["mixin", "collectionFactory", "context", filterColExt]);