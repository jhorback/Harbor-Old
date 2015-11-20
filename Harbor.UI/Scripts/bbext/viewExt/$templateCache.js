

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
// templateCache.cachTemplateFor(name, el, { isRoot: true, shims: []});
// This is done by the templateRenderer for the root template.
// If a standalone view attempts to get it's template and it has not been pre-cached
// it will be considered a root template.
bbext.templateCache = function (
	globalCache,
	unparsedTemplateFinder,
	context,
	shims) {

    var templates = globalCache.track("templates", {});

    // set the template parsing to {{value}} instead of <%= value %>
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


    function getShimsToParse(viewName) {
        return context.get(viewName, true).prototype.shims || [];
    }


    return {
        cacheTemplateFor: function (name, templateEl, options) {
            var html, templateFn, metaData, shimsToParse;

            options = options || {};

            templateFn = templates[name];
            if (templateFn) {
                templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
                return templateFn;
            }

            if (_.isFunction(templateEl)) {
                // for caching an already parsed template under
                // a different name
                templateFn = templateEl;
            } else {
                // options.shims comes from the templateRenderer
                // if we have none, then pull them from the views prototype
                shimsToParse = options.shims || getShimsToParse(name);
                shims.parse(templateEl, shimsToParse); // collectionRenderer adds data-templatefor!
                metaData = templateEl.data();
                metaData.shims = shims.determineShimsForRender(templateEl, options.shims || shimsToParse);
                metaData.templateEl = templateEl;

                templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
                //console.debug("before append");
                html = $('<div/>').append(templateEl[0].outerHTML).html(), // jch* try cloneNode
                //console.debug("after append");
				templateFn = _.template(String(html));
                //templateFn = templateEl;
                templateFn.data = metaData;
                if (options.isRoot === true) {
                    templateEl.removeAttr("data-templatefrom").attr("data-templatefor", name);
                }
            }

            templates[name] = templateFn;
            return templateFn;
        },

        getTemplateFor: function (name) {
            var templateFn = templates[name],
				templateEl;

            if (!templateFn) {
                templateEl = unparsedTemplateFinder.find(name);
                templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
                if (templateEl.length === 0) {
                    throw "Template for '" + name + "' not found";
                }
                templateFn = this.cacheTemplateFor(name, templateEl, { isRoot: true });
            }

            return templateFn;
        }
    };
}


bbext.service("templateCache", [
	"globalCache",
	"unparsedTemplateFinder",
	"context",
	"shims",
	bbext.templateCache
]);
