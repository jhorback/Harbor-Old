/*globals */
/*
*/
var closeViewExt = (function () {
	"use strict";

	var extension = {
		close: function (options) {
			/// <summary>
			/// An option other than remove that does not
			/// remove the view el and calls an optional 'onClose'
			/// method when called.
			/// </summary>
			this.trigger("close");
			this.onClose && this.onClose();
			this.undelegateEvents();
			this.off();
			this.stopListening();

			if (options && options.remove === true) {
				this.remove();
			}
			return this;
		}
	};

	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};

});

context && context.module("bbext").service("bbext.closeViewExt", closeViewExt);