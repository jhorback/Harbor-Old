/** @module bbext */
var bbext = context.module("bbext").use("Backbone", "appui");


/*
 * This code adds support for the html 5 <template> specification.
 *     now we can put our templates inside a <template> tag.
 *     This code will be updated with the refactoring of:
 *          data-templatefor -> data-view
 *          templateRenderer + viewRenderer being merged into the viewRenderer
 *          templateCache renamed as the viewCache.
 *          (thusly semantically creating a difference between html 5 template and backbone view template)
 *
 * unparsedTemplateFinder and templateBootstrap
 * 
 * The templateBootstrap polyfills the <template> tag and looks for 
 *     root child nodes that have the data-templatefor attribute to 
 *     register with the unparsedTemplateFinder.
 *
 * The unparsedTemplateFinder looks first in its cache then in the dom
 *     to return a template el that has not had it's child views parsed.

 * An unparsed template is one that has not had its child data-templatefor elements
 *     cached off by the template/view cache.
 */
bbext.unparsedTemplateFinder = function (globalCache) {
	var unparsedTemplates = globalCache.track("bbext.nparsedTemplates", {});

	return {
		find: function (name) {
			var el = unparsedTemplates[name];
			return el ? el : $("[data-templatefor='" + name + "']");
		},
		cache: function (name, el) {
			unparsedTemplates[name] = el;
		}
	};
};


bbext.service("unparsedTemplateFinder", [
	"globalCache",
	bbext.unparsedTemplateFinder
]);


bbext.templateBootstrap = function (unparsedTemplateFinder) {

	var hasTemplateSupport = 'content' in document.createElement('template');


	function polyFillTemplate(el) {
		var childNodes = el.childNodes,
			contentFragment = document.createDocumentFragment();
		
		while (childNodes[0]) {
			contentFragment.appendChild(childNodes[0]);
		}
		el.content = contentFragment;
	}

	function cacheViewsForTemplate (index, template) {
		if (!hasTemplateSupport) {
			polyFillTemplate(template);
		}

		_.each(template.content.childNodes, function (el) {
			var viewName;

			el = $(el);
			viewName = el.attr("data-templatefor");
			if (viewName) {
				unparsedTemplateFinder.cache(viewName, el);
			}
		});

		$(template).attr("data-cached", true);
	}

	$("template:not([data-cached])").each(cacheViewsForTemplate);
};



bbext.config([
	"unparsedTemplateFinder",
	bbext.templateBootstrap
]);
