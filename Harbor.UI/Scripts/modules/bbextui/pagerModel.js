
/*
Pager attributes of note:
	count and total count - need to be updated when the server syncs.
	skip - is the property to listen to for page changes.
	take - Override this to change the page size
*/
/**
 * @module bbext
 * @class pagerModel
 * @type {{defaults: , [cannotGoPrevious]: {get: get, bind: string[]}, [cannotGoNext]: {get: get, bind: string[]}, [description]: {get: get, bind: string[]}, canGoPrevious: canGoPrevious, canGoNext: canGoNext, first: first, previous: previous, next: next, extend: extend}}
 */
bbext.pagerModel =  {

    /**
     * @type {{take: number, skip: number, totalCount: number?, description: string?,
     * cannotGoPrevious: boolean, cannotGoNext: boolean}}
     */
	defaults: {
		take: 50,
		skip: 0,
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

    /**
     * Returns true if there are previous pages to navigate to, otherwise false
     * @returns {boolean}
     */
	canGoPrevious: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    count = attrs.totalCount;
		return (count !== 0) && ((skip - take) >= 0);
	},

    /**
     * Returns true if there are pages beyond the current one, otherwise false
     * @returns {boolean}
     */
	canGoNext: function () {
		var attrs = this.attributes,
				totalCount = attrs.totalCount,
			    take = attrs.take,
			    skip = attrs.skip,
				count = attrs.totalCount;
		totalCount = totalCount || take + skip + 1;
		return (count !== 0) && ((take + skip) < totalCount);
	},

    /** Goes to the very first page of results (sets skip to 0)  */
	first: function () {
		this.set("skip", 0);
	},

    /** Goes to the previous page of results if possible */
	previous: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    can;

		can = this.canGoPrevious();
		if (can) {
			this.set("skip", skip - take);
			this.trigger("page:change");
		}
	},

    /** Goes to the next page of results if possible */
	next: function () {
		var attrs = this.attributes,
		    take = attrs.take,
		    skip = attrs.skip,
		    can;

		can = this.canGoNext();
		if (can) {
			this.set("skip", take + skip);
			this.trigger("page:change");
		}
	},

    /**
     * Given an object, merges the properties in that object with the `take` and `skip`
     * attributes from this model and returns the results. If the object is a model or
     * collection, `toJSON` will be used to extract the data.
     * @param {object|Backbone.Model|Backbone.Collection} data
     * @returns {Object}
     */
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



bbext.model("pagerModel", bbext.pagerModel);
