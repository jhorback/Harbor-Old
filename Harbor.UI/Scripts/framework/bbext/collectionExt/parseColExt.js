/*
  Overrides the parse method.
  Tests if results are being passed as a property to secure the data.
  Also looks for totalCount and sets it as a property on the collection for paging.
*/
bbext.parseColExt = function () {
	
	var parseColExt = {
		parse: function (resp) {
			if (resp.results && typeof resp.totalCount !== 'undefined') {
				this.totalCount = resp.totalCount;
				return resp.results;
			}
			return resp;
		}
	};

	return parseColExt;
}


bbext.mixin("parseColExt", [
	bbext.parseColExt
]);
