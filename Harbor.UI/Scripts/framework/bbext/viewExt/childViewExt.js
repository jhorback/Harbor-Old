/*
need:

removeAllViews or does binding handle removing all views?
need a way for the collection renderer to know how to find it's view
// could be tracked by the collection renderer

testing...

Also adds the model and collection factories and methods
*/
bbext.childViewExt = function () {
	"use strict";

	function ChildViewContainer(view) {
		this.view = view;
		this.children = {};
	};
	
	ChildViewContainer.prototype = {
		add: function (view) {
			this.children[view.cid] = view;
			view.on("close", _.bind(function () {
				this.remove(view);
			}, this));
		},

		each: function (fn, proxy) {
			_.each(this.children, fn, proxy);
		},
		
		remove: function (view) {
			if (!view) { // remove all
				var parentView = this.view;
				_(this.children).each(function (childView) {
					parentView.views.remove(childView);
				});

			} else {
				view.remove && view.remove();
				delete this.children[view.cid];
			}
		}
	};


	return {
		ctor: {
			before: function () {
				this.views = new ChildViewContainer(this);
				this.on("close", _.bind(this.views.remove, this.views));
			}
		},

		detachView: function () {
		    if (this.$el.data("isDetached")) {
		        return;
		    }

		    this.$el.data("detachedPlaceholder", $('<span style="display:none;"/>').insertAfter(this.$el));
		    this.$el.data("isDetached", true);
		    this.$el = this.$el.detach();
		},

		reattachView: function () {
		    var detachedPlaceholder = this.$el.data("detachedPlaceholder");
		    if (detachedPlaceholder) {
		        this.$el.insertBefore(detachedPlaceholder);
		        detachedPlaceholder.remove();
		        this.$el.removeData("detachedPlaceholder");
		    }
		    this.$el.removeData("isDetached");
		},

		isDetached: function () {
		    // console.debug("is view:", this.name, "detached:", this.$el.data("isDetached"));
		    return this.$el.data("isDetached") ? true : false;
		}
	};
}


bbext.mixin("childViewExt", [
	bbext.childViewExt
]);

