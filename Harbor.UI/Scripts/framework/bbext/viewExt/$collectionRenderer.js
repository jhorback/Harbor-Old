/*
Note: If the value set as the collection is not a Backbone collection then
it will be turned into one. If it is a simple array, the model used will have
the value of the array as a 'this' and 'value' property.

this.collection = ["foo", "bar"];
<span data-bind="text: this"></span>
<span data-bind="text: value"></span>

Events
Triggers a "collectionrendered" dom event on the parent view of the collection.
This enables something like:
	<div data-event="collectionrendered:selectItem"></div>


Rendering notes
this.view.$el is the parent of the <template> to render as a collection.
this.sourceTemplate, as always, is the root template (not the item/view template).
the contents are repeated for each item in the collection and is used
    as the anchor in the parent to know where to render the colleciton.
*/
var collectionRenderer = function (
    modelBinder,
    viewRenderer,
    viewFactory
) {
    "use strict";

    function renderer(view, sourceTemplate) {
        var parsed;

	    this.view = view;
	    this.sourceTemplate = sourceTemplate;
	    this.anchorEl = getAnchorEl(this.view);
	    this.viewNames = this.sourceTemplate.data("parsed")[this.view.name].collectionItemViewNames;
	    this.collection = view.collection = ensureBBCollection(view.collection);
	    this.lastElByModelId = {}; // key is the model id, value the first view in the template

	    // bind to the collection events
		_.bindAll(this, "addItem", "removeItem", "render", "close", 'triggerRenderedEvent');

		view.listenTo(view.collection, "add", this.addItem);
		view.listenTo(view.collection, "remove", this.removeItem);
		view.listenTo(view.collection, "reset sort", this.render);
	}

	renderer.prototype = {
	    render: function () {
	        //console.time(this.view.collection.name);
	        
	        this.view.detachView();
	        this.empty({ detach: false });

			this.collection.each(function (model) {
				this.addItem(model);
			}, this);
			
			this.view.reattachView();
			//console.timeEnd(this.view.collection.name);
		},

	    addItem: function (model) {
	        var modelIndex = this.collection.indexOf(model),
                previousModel = this.collection.at(modelIndex - 1),
                previousView,
                itemFrag;
	
	        previousView = (previousModel ?
                this.lastElByModelId[previousModel.id] :
                this.anchorEl) || this.anchorEl;

	        itemFrag = this.renderViewTemplate(model);
	      
	        // append the items fragment after the anchor
            // if first, otherwise after it's prvious item
	        previousView.after(itemFrag);
	       

            this.triggerRenderedEvent();
	    },

        // returns a jQuery documentFragment
	    renderViewTemplate: function (model) {
	        var frag = $(document.createDocumentFragment()),
                lastIndex = this.viewNames.length - 1,
                i = 0,
                nodeView;

	        for (; i < this.viewNames.length; i++) {
	            nodeView = viewRenderer.render(this.viewNames[i], {
	                model: model
	            }, {
	                isParsedView: true,
	                sourceTemplate: this.sourceTemplate
	            });

	            nodeView.$el.attr("data-cid", model.cid);
	            nodeView.$el.data("view", nodeView);

	            frag.append(nodeView.$el);
	            this.view.views.add(nodeView);

	            if (i === lastIndex) {
	                this.lastElByModelId[model.id] = nodeView.$el;
	            }
	        }

	        return frag;
	    },

		removeItem: function (model) {
		    var els = this.view.$("[data-cid='" + model.cid + "']"),
                i = 0,
		        itemView,
                el;                

		    for (; i < els.length; i++) {
		        el = $(els[i]);
		        itemView = el.data("view");
		        el.remove();
		        this.view.views.remove(itemView);
		    }

		    delete this.lastElByModelId[model.id];

            this.triggerRenderedEvent();
		},

		empty: function (options) {
		    var detach = options && options.detach !== false;

		    this.lastElByModelId = {};
		    if (detach) {
		        this.view.detachView();
		    }
		    this.view.views.remove();
		    this.triggerRenderedEvent();
		    if (detach) {
		       this.view.reattachView();
		    }
		},

        triggerRenderedEvent: _.debounce(function() {
            modelBinder.updateEl(this.view.$el);
            this.view.$el.trigger("collectionrendered", [this.collection]);
        }, 50),

		close: function () {
			this.empty();
		}
	};

	return {
	    render: function (view, sourceTemplate) {
	        var thisRenderer = new renderer(view, sourceTemplate);
			thisRenderer.render();
			view.on("close", thisRenderer.close);
		}
	};


	function getAnchorEl(view) {
	    //return viewTemplate;
	    var viewTemplate = view.$('[data-view-from="' + view.name + '"]'),
            commentAnchorEl;
	   
	    // replace the view template with a comment el
        // and use the comment element as the anchor for the collection rendering
	    commentAnchorEl = $("<!-- " + view.collection.name + " -->");
	    viewTemplate.replaceWith(commentAnchorEl);
	    return commentAnchorEl;
	}


	function ensureBBCollection(col) {
		if (col instanceof Backbone.Collection === false) {
			if (col.length > 0 && typeof col[0] === 'string') {
				col = _(col).map(function (value) {
					return { 'this': value, value: value };
				});
			}
			col = new Backbone.Collection(col);
		}
		return col;
	}
};


bbext.service("bbext.collectionRenderer", [
	"modelBinder",
    "viewRenderer",
    "viewFactory",
	bbext.collectionRenderer = collectionRenderer
]);
