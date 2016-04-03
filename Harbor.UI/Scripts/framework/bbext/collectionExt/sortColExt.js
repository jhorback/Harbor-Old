

bbext.sortColExt = function () {

	return {

		/**
         * Updates the comparator and, unless true is passed as the optional second param, immediately sorts the collection
         * @this {Backbone.Collection}
         * @param {function(Backbone.Model,Backbone.Model)|function(Backbone.Model)|string} comparator
         * @param {bool=} [silent] - if true, .sort will not automatically be called after updating the comparator
         */
		setSort: function (comparator, silent) {
			this.comparator = comparator;
			if (silent !== true) {
				this.sort();
			}
			// this.trigger("reset");
		}
	};
};


bbext.mixin("sortColExt", [
	bbext.sortColExt
]);
