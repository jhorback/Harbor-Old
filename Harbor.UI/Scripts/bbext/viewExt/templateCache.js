

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
function templateCache($, _, globalCache) {

	globalCache.set("templates", {});

	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


	return {
		cacheTemplateFor: function (name, templateEl) {
			var html, templateFn, metaData;

			if (_.isFunction(templateEl)) {
				// for caching an already parsed template under
				// a different name
				templateFn = templateEl;
			} else {
				metaData = templateEl.data();
				metaData.templateEl = templateEl;
				templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
				html = $('<script/>').append(templateEl[0].outerHTML).html(),
				templateFn = _.template(String(html));
				templateFn.data = metaData;
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
				templateFn = this.cacheTemplateFor(name, templateEl);
			}

			return templateFn;
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
