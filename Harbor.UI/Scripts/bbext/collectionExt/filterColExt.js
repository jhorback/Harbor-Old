/*
Calling setFilter will create a source collection from the current models
then filter the collection.
*/
function filterColExt(mixin, collectionFactory) {
	
	var filterColExt = {
		setFilter: function (filter) {
			var filtered;

			setupSource.apply(this);
			
			this.currentFilter = filter;
			if (!filter) {
				filtered = this.source.models;
			} else {
				filtered = this.source.filter(filter);
			}
			
			this._sync = true;
			this.set(filtered); // will fire add, remove, merge, events
			this._sync = false;
		},
		
		clearFilter: function () {
			this.setFilter(null);
		}
	};

	function setupSource() {
		if (this.source) {
			return;
		}

		this.source = collectionFactory.create(this.name, this.models);

		// keep the source models in sync
		this.on("all", function (event, model) {
			if (!this._sync && (event === "add" || event === "remove")) {
				this.source[event](model);
			}
		}, this);
	}

	mixin("collection").register("bbext.filterColExt", filterColExt);

};


bbext.config(["mixin", "collectionFactory", "context", filterColExt]);