/*
	Adds a postBatchAction method to a collection.
	If an ids property is not defined on the data, then the ids
	will be pulled from the models idAttribute.

	Example url: /api/users/batch/disable
		- api/users is the url of the collection
		- disable is the action passed to postBatchAction
*/
function postActionColExt(mixin) {
	
	var postActionColExt = {
		postBatchAction: function (action, data) {
			var url = this.url + "/batch/" + action,
			    idAttribute;
		
			if (!this.url) {
				throw new Error("A url is required for postBatchAction.");
			}

			data = data || {};
			idAttribute = (this.models[0] && this.models[0].idAttribute) || "id";
			if (!data.ids) {
				data.ids = this.pluck(idAttribute);
			}
		
			return this.sync(action, this, {
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(data)
			});
		}
	};

	mixin("collection").register("bbext.postActionColExt", postActionColExt);

};


bbext.config(["mixin", postActionColExt]);