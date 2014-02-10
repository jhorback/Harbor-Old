﻿/*
	Adds a posAction method to a model.
	
	Example url: /api/users/5/disable
		- api/users is the url of the collection
		- disable is the action passed to postBatchAction
*/
function postActionModelExt(mixin) {
	
	var postActionModelExt = {
		postAction: function (action, data) {
			var root = this.urlRoot || (this.collection && this.collection.url),
			    url,
			    id;
		
			if (!root) {
				throw new Error("A url is required for postAction.");
			}

			id = this.get("id");
			url = root + "/" + id + "/" + action;
			data = data || {};
			data.id = id;
			return this.sync(action, this, {
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(data)
			});
		}
	};

	mixin("model").register("bbext.postActionModelExt", postActionModelExt);

};


bbext.config(["mixin", postActionModelExt]);