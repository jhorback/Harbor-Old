

function sortColExt(mixin) {
	
	var sortColExt = {
		setSort: function (fn) {
			this.comparator = fn;
			this.sort();
			this.trigger("reset");
		}
	};

	mixin("collection").register("bbext.sortColExt", sortColExt);

};


bbext.config(["mixin", sortColExt]);