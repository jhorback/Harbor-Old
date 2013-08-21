﻿/*
 * renderViewExt
 * 
 * Description
 *     Implements the render method for Backbone views
 *
 * On Rendering
 *     Uses the name property of the view to find the template
 *         The name property is put there by the view construct
 *     Calls shim.render
 *          The view is placed as data on the $el: $el.data("view").
 *          So the shim has access to the view.
 *
 * [data-model] attribute
 *     An optional data-model attribute can be used to pick out a sub model from it's parent.
 *
 * onRender callback
 *     Calls an optional onRender method after rendering passing the determined model or collection
 *
 * Collection rendering
 *     If the model is not defined but a collection is, the collectionRenderer will be used
 *     to do the rendering.
 *
 */
function renderViewExt(_, $, templateCache, collectionRenderer) {
	"use strict";

	var extension = {
		render: function () {
			var templateFn,
			    el,
			    shims;

			templateFn = templateCache.getTemplateFor(this.name);
			setModel(this, templateFn.data);

			if (this.collection) {
				
				collectionRenderer.render(this);

			} else {
				
				el = $(templateFn(modelJSON(this.model)));
				shims = this.context.get("shims");

				// set the element since the template contains the root
				this.$el.replaceWith(el);
				this.setElement(el);

				// add the view to the $el.data (for the shims)
				this.$el.data("view", this);

				// allow the shims to render
				shims.render(this.$el, this.model);
			}

			this.trigger("render");
			this.onRender && this.onRender(this.model || this.collection);

			return this;
		}
	};

	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};

	function modelJSON(model) {
		return model ? (model.toJSON ? model.toJSON() : model) : {};
	}

	// if there is a data-model attribute on the template root
	// try to get the sub model from the parent model using model.get(name) or model[name]
	function setModel(view, data) {
		var model = view.model,
		    modelAttr = data.model || data.collection,
			retModel;

		if (!model || !modelAttr) {
			return;
		}
		
		if (model.get) {
			var getVal = model.get(modelAttr);
			if (getVal) {
				retModel = getVal;
			}
		}
		retModel = retModel ? retModel : model[modelAttr];
		
		if (data.model) {
			view.model = retModel;
		} else {
			view.collection = retModel;
		}
	}
}

bbext.service("bbext.renderViewExt", ["_", "$", "templateCache", "bbext.collectionRenderer", bbext.renderViewExt = renderViewExt]);





var collectionRenderer = function (templateCache) {


	function renderer(view) {
		var templateEl;
		
		this.view = view;
		this.collection = view.collection;
		this.templateFn = templateCache.getTemplateFor(view.name);

		templateEl = this.templateFn.data.templateEl;
		view.setElement(templateEl.parent());
		view.$el.empty();
	}

	renderer.prototype = {
		render: function () {
			this.collection.each(function (model, index) {
				// ItemView = this.getItemView(item);
				this.addItem(model);
			}, this);
		},
		
		addItem: function (model) {
			var el = $(this.templateFn(model.toJSON()));
			this.view.$el.append(el);
		},
	
		close: function () {
			
		}
	};
	

	
	return {
		render: function (view) {
			debugger;
			var viewRenderer = new renderer(view);
			viewRenderer.render();
			view.on("close", viewRenderer.close);
		}
	};
	
	
};


bbext.service("bbext.collectionRenderer", ["templateCache", bbext.collectionRenderer = collectionRenderer]);
