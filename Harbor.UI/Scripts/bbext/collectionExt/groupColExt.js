/*
A grouped collection is a collection of models with the following structure:
	{
		name: groupName,
		models: groupedCollection
	}

A grouped collection is a standard collection and can even have defined model types.


setGroupBy
	To use the setGroupBy() method, the collection needs to be created with a 'groupSource' option.
	The 'groupSource' is the ungrouped collection.


groupSource
	The groupSource collection can also be interacted with directly to add/remove models.
	The grouped collection has listeners on the groupSource to keep items grouped as neccessary.


Sorting the grouped collections
    The models are a collection created as the same type of the 'groupSource' so the comparator 
    will keep the items sorted.

*/
function groupColExt(mixin, _, collectionFactory) {
	
	var groupColExt = {
		afterInit: function () {
			if (this.options.groupSource) {
				setGroupSource.call(this, this.options.groupSource);
			}
		},

		setGroupBy: function (groupBy) {
			var group;
			
			if (!this.groupSource) {
				throw new Error("Cannot group a collection without a groupSource.");
			}
			

			this.reset();
			this.groupBy = groupBy;
			group = _(this.groupSource).groupBy(groupBy);
			_.each(group, function (models, name) {
				this.add({
					name: name,
					models: collectionFactory.create(this.groupSource.name, models)
				});
			}, this);
		}
	};
	

	function setGroupSource(groupSource) {
		this.groupSource = groupSource;
		
		this.listenTo(this.groupSource, "all", function (event, model) {
			if (!this._sync && (event === "add" || event === "remove")) {
				this.setGroupBy(this.groupBy); // could optimize this
			}
		}, this);
	}


	mixin("collection").register("bbext.groupColExt", groupColExt);

};


bbext.config(["mixin", "_", "collectionFactory", groupColExt]);