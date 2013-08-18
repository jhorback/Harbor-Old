

// templateCache
// compiles caches and returns templates by view name
var templateCache = (function () {

	return function ($, _, globalCache) {

		globalCache.set("templates", {});

		// set the template parsing to {{value}} instead of <%= value %>
		_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


		return {
			cacheTemplateFor: function (name, templateEl) {
				var html, templateFn;

				templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
				html = $('<script/>').append(templateEl[0].outerHTML).html(),
				templateFn = _.template(String(html));

				setTemplate(name, templateFn);
				return templateFn;
			},

			getTemplateFor: function (name) {
				var templateFn = getTemplate(name),
					templateEl;

				if (!templateFn) {
					templateEl = $("[data-templatefor='" + name + "']");
					templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
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
	};

}());

context.module("bbext").service("templateCache",
	["$", "_", "globalCache", templateCache]);
