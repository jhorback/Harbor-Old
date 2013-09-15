


function filterColExt(mixin, collectionFactory) {
	
	var filterColExt = {
		afterInit: function (models, options) {

			if (options.isSource) {
				return;
			}
			
			this.source = collectionFactory.create(this.name, this.models, {
				isSource: true
			});
			
			
			// keep the source models in sync
			this.on("all", function (event, model) {
				if (event === "add" || event === "remove") {
					this.source[event](model);
				}
			}, this);
		},
		
		setFilter: function (filter) {
			var filtered;
			
			// don't allow attempts at filtering source collections
			if (!this.source) {
				return;
			}
			
			this.currentFilter = filter;
			if (!filter) {
				filtered = source;
			} else {
				filtered = this.source.filter(filter);
			}
			
			this.set(filtered); // will fire add, remove, merge, events
		},
		
		clearFilter: function () {
			this.setFilter(null);
		}
	};

	mixin("collection").register("bbext.filterColExt", filterColExt);

};


bbext.config(["mixin", "collectionFactory", "context", filterColExt]);