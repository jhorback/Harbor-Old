/*globals */
/*
*/
var closeViewExt = function (_, Backbone) {
	"use strict";

	var extension = {
		close: function (options) {
			/// <summary>
			/// An option other than remove that does not
			/// remove the view el and calls an optional 'onClose'
			/// method when called.
			/// </summary>
			if (this.isClosed) {
				return this;
			}
			
			this.isClosed = true;
			this.trigger("close");
			this.onClose && this.onClose();
			this.undelegateEvents();
			this.off();
			this.stopListening();

			if (options && options.remove === true) {
				this.remove();
			}
			return this;
		},
		
		remove: function () {
			this.close();
			Backbone.View.prototype.remove.apply(this);
		}
	};

	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};

};

bbext.service("bbext.closeViewExt", ["_", "Backbone", closeViewExt]);