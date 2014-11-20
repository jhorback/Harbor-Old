/*
 * collection options
 *     groupSource - The source collection
 *     groupBy - A function that is mapped to return the group name.
 * 
 * groupBy - can be a property in the prototype of a collection.
 * 
 * A grouped collection is a collection of models with the following structure:
 *  	{
 *  		name: groupName,
 *  		models: groupedCollection
 *  	}
 *  
 * A grouped collection is a standard collection and can have defined model types
 * which can be useful if a more advanced group model is needed.
 * 
 *
 * Methods 
 *    setGroupBy(groupBy)
 *        Use to set the group by after the creation of the collection.
 *    setGroupSort(sort) 
 *        Passes the sort function down to the group source.
 *        Using the comparator when sorting is known up front. 
 *  
 */
bbext.groupColExt = function (mixin, _, collectionFactory) {
	
	var groupColExt = {
		afterInit: function (models, options) {
			if (options && options.groupSource) {
				setGroupSource.call(this, options);
			}

			if (options && (options.groupBy || this.groupSourceBy)) {
				this.setGroupBy(options.groupBy || this.groupSourceBy);
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
		var groupBy;
		
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

		groupBy = options.groupBy || this.groupBy;
		groupBy && this.setGroupBy(groupBy);
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


bbext.config(["mixin", "_", "collectionFactory", bbext.groupColExt]);