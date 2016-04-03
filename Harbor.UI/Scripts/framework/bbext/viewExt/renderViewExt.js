// 
// renderViewExt
//     implements the render method for Backbone views
// 
// render(renderOptions)
//     - renderOptions - the parsed sourceTemplate is passed down in the renderOptions from the viewRenderer.
//         if the template has not been parsed (for legacy views) one will be located
//         by looking for an element with the data-view attribute set the the views name.
// 
// [data-model] attribute
//     - an optional data-model attribute can be used to pick out a sub model from it's parent.
// 
// onRender callback and event
//     - alls an optional onRender method after rendering passing the determined model or collection.
//     - triggers an "onrender" event on the view.
// 
// onResolve callback
//     - same as onRender, however, fires after all shims have resolved. Useful when needing to wait for
//     sub templates to render for example.
//     - triggers an "onresolve" event on the view.
// 
// Collection rendering
//     -if the view.collection is defined, the collectionRenderer will be used
//     to do the rendering.
// 
// Server rendering
//     fromServer property:
//         -adding a property to the view: fromServer: true
//         will skip the template rendering (but still call on shims).
//     renderFromServer method:
//         -uses the serverUrl to fetch the new html. Ensures the
//         fromServer flag is set to true. Then calls the render method.
//     serverUrl method:
//          -serverUrl method can be defined to return a url
//          used to fetch the new dom contents. Shims will be re-rendered.
// 
bbext.renderViewExt = function (
    templateParser,
    collectionRenderer,
    shims
) {
	"use strict";

	return {
	    render: function (renderOptions) {
	        var el,
                parsedData,
                sourceTemplate,
                shimsToResolve,
                onRender = triggerAndCallback("Render", this),
	            onResolve = triggerAndCallback("Resolve", this);

	        renderOptions = renderOptions || {};
	        sourceTemplate = renderOptions.sourceTemplate || templateParser.parseTemplateByName(this.name);
	        parsedData = templateParser.getParsedData(this.name, sourceTemplate);
	        setModel(this, parsedData.data);

	        if (this.collection) {

	            collectionRenderer.render(this, sourceTemplate);
	            onRender();
	            onResolve();
	        } else {        

                // dont set the element if coming from the server
                if (this.fromServer !== true) {
                    el = parsedData.template.clone(true);

                    // collection templates and root nodes are not seeded
                    // thier el, so replace these
                    if (!this.$el.attr("data-view-from")) {
                        this.$el.replaceWith(el);
                        this.setElement(el);

                    } else {
                        this.$el.empty().append($(el).contents());
                    }                    
	            }

	            // add the view to the $el for the shims and render the
	            // shims (modelBidner, templateBinder, eventBinder are the primary shims)
	            this.$el.data("view", this);
	            shimsToResolve = shims.render(this.$el, this.model, parsedData.shims, sourceTemplate);
	            onRender();
	            setTimeout(_.bind(function () {
	                shims.resolve(this.$el, this.model, shimsToResolve, sourceTemplate);
	                onResolve();
	            }, this), 0);
	        }
	    },

		renderFromServer: function () {
			var serverUrl,
				view = this;

			this.fromServer = true;
			serverUrl = this.serverUrl();
			$.ajax({
				url: serverUrl,
				dataType: "html"
			}).then(function (response) {
			    view.$el.empty().html(response);
			    view.$el.trigger("sync");
			});
		},

		serverUrl: function () {
			throw new Error("The serverUrl method was not defined.");
		}
	};


	function triggerAndCallback(event, binding) {
	    return _.bind(function () {
	        var callback = this["on" + event];
	        this.trigger(event.toLowerCase());
	        callback && callback.call(this, this.model || this.collection);
	    }, binding);
	}


	// if there is a data-model attribute on the template root
	// try to get the sub model from the parent model using model[name] or model.get(name)
	function setModel(view, data) {
	    var model = view.model,
            // data = view.$el.data(),
			modelAttr = data.model || data.collection,
			retModel = null,
			getVal;

		if (!model || !modelAttr) {
			return;
		}

		retModel = walkModel(model, modelAttr);

		if (data.model) {
			view.model = retModel;

	    } else if (data.collection) {
	        view.collection = retModel;
	    }
	}

	// walks the "."'s - nested models
	function walkModel(model, modelAttr) {
		// return model[modelAttr];
		var i = 0,
			curr = model,
			next = null,
			getVal,
			attr,
		    parts = modelAttr.split(".");

		for (; i < parts.length; i++) {
			attr = parts[i];
			next = curr[attr];
			if (!next && curr.get) {
				getVal = curr.get(attr);
				if (getVal) {
					next = getVal;
				}
			}
			if (!next) {
				return null;
			}
			curr = next;
		}
		return next;
	}
};

bbext.mixin("renderViewExt", [
	"templateParser",
	"bbext.collectionRenderer",
    "shims",
	bbext.renderViewExt
]);
