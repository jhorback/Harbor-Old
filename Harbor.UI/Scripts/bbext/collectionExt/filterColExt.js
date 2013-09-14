


function filterColExt(mixin) {

	var filterColExt = {
		afterInit: function () {
			
			// this.source = new collection(this.models);
			// add reverse linking to the source - add/remove - 

			// this.source = this.collectionFactory.create(this.name, this.models);
		},
		
		setFilter: function () {
			//this.currentFilter = filter;
			//filtered = this.source.filter(filter);
			//this.set(filtered); // will fire events

		},
		
		clearFilter: function () {
			// this.setFilter(null);
		}
	};

	mixin("collection").register("bbext.filterColExt", filterColExt);

};


// bbext.config(["mixin", filterColExt]);