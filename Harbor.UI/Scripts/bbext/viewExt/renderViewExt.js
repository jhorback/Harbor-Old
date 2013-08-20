/*
 * renderViewExt
 * 
 * Description
 *     Implements the render method for Backbone views.     
 *     Uses the name property of the view to find the template
 *         The name property is put there by the view construct
 *     Calls shim.render
 *          The view is placed as data on the $el: $el.data("view").
 *          So the shim has access to the view.
 *     Calls an optional onRender method after rendering.

	
	determine model or collection
	--> WHICH piece of code does the iterating - 


 */
context.module("bbext").service("bbext.renderViewExt", [
	"_", "$", "templateCache",
function (_, $, templateCache) {
	"use strict";
	
	/*
	render: function () {
			var templateId = this.name;
			if (!templateId) {
				throw new Error("Render was called without a name property on the view.");
			}

			// jch* until appjs is migrated to, add shim and render functionality here
			this.$el.data("view", this);
			this.bindTemplate(templateId, this.$el, this.model);
			// eventBinder.render(this.$el, this.model);
			return this;
		},*/
	

	var extension = {
		render: function () {
			var model = this.model || this.collection,
			    templateFn = templateCache.getTemplateFor(this.name),
			    el = $(templateFn(modelJSON(model))),
			    shims = this.context.get("shims");

			// set the element since the template contains the root
			this.$el.replaceWith(el);
			this.setElement(el);
			
			// add the view to the $el.data
			this.$el.data("view", this);


			// allow the shims to render
			shims.render(this.$el, subModel(this.$el, model));
			
			this.onRender && this.onRender();
			
			return this;
		}
	};

	return  {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};
	
	function modelJSON(model) {
		return model ? (model.toJSON ? model.toJSON() : model) : {};
	}

	// if there is a data-model attribute on the template root
	// try to get the sub model from the parent model using model.get(name) or model[name]
	function subModel(el, model) {
		var retModel,
			modelAttr = el.data("model");

		if (!modelAttr) {
			return model;
		}
		
		if (model.get) {
			var getVal = model.get(modelAttr);
			if (getVal) {
				retModel = getVal;
			}
		}
		
		if (!retModel) {
			retModel = model[modelAttr];
		}
		
		return retModel;
	}
}]);