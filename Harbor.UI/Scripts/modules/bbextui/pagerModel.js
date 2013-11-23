
/*
Pager attributes of note:
	count and total count - need to be updated when the server syncs.
	skip - is the property to listen to for page changes.
	take - Override this to change the page size
*/

bbext.pagerModel = function (attrs, options) {
	
};


bbext.pagerModel.prototype = {
	defaults: {
		take: 50,
		skip: 0,
		count: null,
		totalCount: null,
		description: null,
		cannotGoPrevious: false,
		cannotGoNext: false
	},
	
	"[cannotGoPrevious]": {
		get: function () {
			return !this.canGoPrevious();
		},
		bind: ["totalCount", "skip", "take"]
	},
	
	"[cannotGoNext]": {
		get: function () {
			return !this.canGoNext();
		},
		bind: ["totalCount", "skip", "take"]
	},
	
	"[description]": {
		get: function () {
			var attrs = this.attributes,
			    totalCount = attrs.totalCount,
			    take = attrs.take,
			    skip = attrs.skip,
			    start = skip + 1,
			    end = (start + take - 1),
			    desc;

			end = Math.min(end, totalCount);
			
			if (end === 0) {
				return "";
			}
			desc = "<b>" + start + "</b>–<b>" + end + "</b>";
			
			if (totalCount) {
				desc += " of <b>" + totalCount + "</b>";
			}
			
			return desc;
		},
		bind: ["totalCount", "skip", "take"]
	},
	
	canGoPrevious: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    count = attrs.count;
		return (count !== 0) && ((skip - take) >= 0);
	},
	
	canGoNext: function () {
		var attrs = this.attributes,
				totalCount = attrs.totalCount,
			    take = attrs.take,
			    skip = attrs.skip,
				count = attrs.count;
		totalCount = totalCount || take + skip + 1;
		return (count !== 0) && ((take + skip) < totalCount);
	},
	
	previous: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    can;
		
		can = this.canGoPrevious();
		if (can) {
			this.set("skip", skip - take);
		}
	},
	
	next: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    can;

		can = this.canGoNext();
		if (can) {
			this.set("skip", take + skip);
		}
	},
	
	// convience method to merge the pager take/skip properties with
	// other query data
	extend: function (data) {
		
		data = data || {};
		
		if (data.toJSON) {
			data = data.toJSON();
		}

		return _.extend({
			take: this.attributes.take,
			skip: this.attributes.skip
		}, data);
	}
};



bbext.model("pagerModel", [
	"attrs",
	"options",
	"_",
	bbext.pagerModel
]);