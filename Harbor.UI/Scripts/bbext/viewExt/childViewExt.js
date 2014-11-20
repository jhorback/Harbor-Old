/*
need:

removeAllViews or does binding handle removing all views?
need a way for the collection renderer to know how to find it's view
// could be tracked by the collection renderer

testing...

Also adds the model and collection factories and methods
*/
function childViewExt(mixin, modelFactory, collectionFactory) {
	
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


	mixin("view").register("childViewExt", {
		
		beforeInit: function () {
			this.modelFactory = modelFactory;
			this.collectionFactory = collectionFactory;
			this.views = new ChildViewContainer(this);
			this.on("close", _.bind(this.views.remove, this.views));
		},

		createModel: modelFactory.create,

		createCollection: collectionFactory.create
	});
}


bbext.config([
	"mixin",
	"modelFactory",
	"collectionFactory",
	childViewExt
]);