/*
  Overrides the parse method.
  Tests if results are being passed as a property to secure the data.
  Also looks for totalCount and sets it as a property on the collection for paging.
*/
function parseColExt(mixin) {
	
	var parseColExt = {
		parse: function (resp) {
			if (resp.results) {
				this.totalCount = resp.totalCount;
				return resp.results;
			}
			return resp;
		}
	};

	mixin("collection").register("bbext.parseColExt", parseColExt);

};


bbext.config(["mixin", parseColExt]);