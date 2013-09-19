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
		afterInit: function (models, options) {
			if (options && options.groupSource) {
				setGroupSource.call(this, options);
			}
		},

		setGroupBy: function (groupBy) {
			var group;
			
			if (!this.groupSource) {
				throw new Error("Cannot group a collection without a groupSource.");
			}			

			this.reset();
			this.groupBy = groupBy;
			group = this.groupSource.groupBy(groupBy);
			_.each(group, function (models, name) {
				add.call(this, name, models);
			}, this);
		},
		
		setGroupSort: function (sort) {
			this.groupSource.setSort(sort);
			this.each(function (model) {
				model.get("models").setSort(sort);
			}, this);
		}
	};
	

	function setGroupSource(options) {
		this.groupSource = options.groupSource;
		
		this.listenTo(this.groupSource, "all", function (event, model) {
			var groupName, group, models;
			
			if (event === "add" || event === "remove") {
				groupName = this.groupBy(model);
				group = this.get(groupName);
				if (group) {
					models = group.get("models");
					models[event](model);
					if (models.length === 0) {
						this.remove(group);
					}
				} else {
					add.call(this, groupName, model);
				}
			} else if (event === "reset") {
				this.setGroupBy(this.groupBy);
			}
			
		}, this);

		options.groupBy && this.setGroupBy(options.groupBy);
	}

	function add(name, models) {
		this.add({
			id: name,
			name: name,
			models: collectionFactory.create(this.groupSource.name, models)
		});
	}

	mixin("collection").register("bbext.groupColExt", groupColExt);

};


bbext.config(["mixin", "_", "collectionFactory", groupColExt]);