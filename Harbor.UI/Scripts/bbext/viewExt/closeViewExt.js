/*globals */
/*
*/
var closeViewExt = function (_, Backbone, mixin) {
	"use strict";
	

	var closeViewExt = {
		afterInit: function () {
			var close = _.bind(this.close, this);
			this.events = this.events || {};
			this.events.close = close;
			this.on("close", close);
		},

		close: function (options) {
			/// <summary>
			/// Triggers a close event. Calls an optional onClose method on the view.
			/// Removes the element unless the markup came from the server.
			/// if options.remove is true it will remove it even if from the server.
			/// </summary>
			var remove;
			
			if (this.isClosed) {
				return this;
			}

			remove = _.bind(function () {
				if (!options || options.remove !== false) {
					this.remove();
				}
			}, this);

			this.isClosed = true;
			this.trigger("close");
			this.onClose && this.onClose();
			this.undelegateEvents();
			this.off();
			this.stopListening();

			if (this.fromServer && options && options.remove === true) {
				remove();
			} else {
				remove();
			}

			return this;
		},

		remove: function () {
			this.close();
			Backbone.View.prototype.remove.apply(this);
		}
	};
	

	mixin("view").register("bbext.closeViewExt", closeViewExt);

};

bbext.config(["_", "Backbone", "mixin", closeViewExt]);