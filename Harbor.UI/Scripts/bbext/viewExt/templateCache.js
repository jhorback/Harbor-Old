

// templateCache
// Compiles caches and returns templates by view name
//
// Adds any data attributes as meta data on the templateFn
// including the original template element.
//
// Example:
// <div data-templatefor="someView" data-foo="bar">...</div>
// var templateFn = templateCache.getTemplateFor("someView");
// var metaData = templateFn.data; // { templatefor: "someView", foo: "bar", templateEl: $el }
//
// Root Templates
// When caching root templates set the isRoot option to true:
// templateCache.cachTemplateFor(name, el, { isRoot: true });
// This is done by the templateRenderer for the root template.
// If a standalone view attempts to get it's template and it has not been pre-cached
// it will be considered a root template.
function templateCache($, _, globalCache) {

	globalCache.set("templates", {});

	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


	return {
		cacheTemplateFor: function (name, templateEl, options) {
			var html, templateFn, metaData;
			
			templateFn = getTemplate(name);
			if (templateFn) {
				return templateFn;
			}

			if (_.isFunction(templateEl)) {
				// for caching an already parsed template under
				// a different name
				templateFn = templateEl;
			} else {
				metaData = templateEl.data();
				metaData.templateEl = templateEl;
				templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
				html = $('<div/>').append(templateEl[0].outerHTML).html(),
				templateFn = _.template(String(html));
				templateFn.data = metaData;
				if (options && options.isRoot === true) {
					templateEl.removeAttr("data-templatefrom").attr("data-templatefor", name);
				}
			}
			
			setTemplate(name, templateFn);
			return templateFn;
		},

		getTemplateFor: function (name) {
			var templateFn = getTemplate(name),
				templateEl;

			if (!templateFn) {
				templateEl = $("[data-templatefor='" + name + "']");
				// templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
				if (templateEl.length === 0) {
					throw "Template for '" + name + "' not found";
				}
				templateFn = this.cacheTemplateFor(name, templateEl, { isRoot: true });
			}

			return templateFn;
		},

		// method is good if the template markup is not used on app start and the markup
		// could be detached from the dom before called upon.
		preloadTemplate: function (name) {
			this.getTemplateFor(name);
		}
	};

	function setTemplate(name, template) {
		var templates = globalCache.get("templates");
		templates[name] = template;
		globalCache.set("templates", templates);
	}

	function getTemplate(name) {
		var templates = globalCache.get("templates");
		return templates[name];
	}
}


context.module("bbext").service("templateCache",
	["$", "_", "globalCache", templateCache]);
