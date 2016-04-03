/*
 * This code adds support for the html 5 <template> specification.
 *     now we can put our templates inside a <template> tag.
 * 
 * The templateBootstrap also looks for <template data-cache-views> tag and caches 
 *     root child nodes that have the data-view attribute to 
 *     register with the rootViewCache.
 */
bbext.templateBootstrap = function (rootViewCache) {

    function cacheViewsForTemplate(index, template) {
        var $template = $(template);

        if (!template.content) {
            HTMLTemplateElement.decorate(template); // upgrade template
            // webcomponenets.js will upgrade all templates on dom ready
            // this just forces the call (Polymer does this too).
        }

        // data-cache-views - deprecated
        if ($template.data("cache-views") !== void (0)) {
            _.each(template.content.childNodes, function (el) {
                var viewName;

                el = $(el);
                viewName = el.attr("data-view");
                if (viewName) {
                    rootViewCache.cache(viewName, el);
                }
            });
        }
        $template.attr("data-cached", true);
    }

    $("template:not([data-cached])").each(cacheViewsForTemplate);
};


bbext.config([
	"rootViewCache",
	bbext.templateBootstrap
]);
