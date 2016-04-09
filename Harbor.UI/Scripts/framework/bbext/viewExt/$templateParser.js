//
// templateParser
// 
// parseTemplate(sourceTemplate)
//     - tags and caches all sub views and determines shims for each
//     - returns the parsed sourceTemplate
//
// parseTemplateByName(name)
//     - legacy support for the view renderer for floating [data-view] elements
//     - enables support for calling the viewFactory direclty (over calling the viewRenderer).
//     - returns the parsed sourceTemplate
// 
// getParsedData(name, sourceTemplate)
//     - returns an object containing parsed data for 
//         the specified view in the source template which is used during view rendering
//     - if the sourceTemplate has not yet been parsed, it will be at this time
//     - returns an object
//         - template - the element template for a data-view
//         - shims - an array of shims that will be used during render
//         - data - data on the original template element (for things like data-view, data-collection).
//        
bbext.templateParser = function (
	rootViewCache,
	context,
	shims,
    viewFactory
 ) {

    return {
        parseTemplate: function (sourceTemplate) {
            var parsed = {},
                isSourceATemplate,
                elToParse;

            sourceTemplate = $(sourceTemplate);

            // templates are parsed once
            if (sourceTemplate.data("parsed") !== void(0)) {
                return;
            }


            sourceTemplate.data("parsed", parsed);
            isSourceATemplate = sourceTemplate[0].tagName === "TEMPLATE";
            parsed._rootViewName = isSourceATemplate ? sourceTemplate[0].id : sourceTemplate.data("view");
            parsed._rootViewShims = getViewShims(parsed._rootViewName) || [];

            // if a template store in a div to be able to search its content
            elToParse = isSourceATemplate ?
                $('<div data-view="' + parsed._rootViewName + '"/>').append(sourceTemplate[0].content) :
                sourceTemplate;

            tagCollapseAndParse(parsed._rootViewName, elToParse, parsed);

            return sourceTemplate;
        },

        parseTemplateByName: function (name) {
            return this.parseTemplate(rootViewCache.get(name));
        },

        getParsedData: function (name, sourceTemplate) {
            this.parseTemplate(sourceTemplate);
            return sourceTemplate.data("parsed")[name];
        },

        parseTemplateFromServer: function (name, sourceTemplate) {
            var parsed = {};
            sourceTemplate.data("parsed", parsed);
            parseView({
                viewName: name,
                template: sourceTemplate,
                shims: getViewShims(name),
                parsed: parsed
            });
        }
    };


    function tagViewFrom(el, viewName) {
        el.removeAttr("data-view").attr("data-view-from", viewName);
    }


    // adds generic data-view attributes to elements with data-model
    // and data-collection attributes
    function tagGenericViewTemplates(el) {
        var collections = el.find("[data-collection]:not([data-view])"),
			models = el.find("[data-model]:not([data-view])");

        collections.add(models).each(function (i, templateEl) {
            var genericViewName = viewFactory.nextGenericName();

            templateEl = $(templateEl);
            templateEl.attr("data-view", genericViewName);
            templateEl.data("isGeneric", true);
        });
    }
   

    // pulls elements marked [data-view] and adds them to the parsed 
    function collapseChildViews(el, parsed) {

        // collapse the child views in reverse
        $(el.find("[data-view]").get().reverse()).each(function (i, viewTemplate) {
            var viewName, shimsToParse, clonedTemplate, collectionItemViewNames

            viewTemplate = $(viewTemplate);

            // if a template, parse each template child
            if (isATemplate(viewTemplate)) {
                collectionItemViewNames = parseCollectionTemplateViews(viewTemplate, parsed);
            }

            viewName = viewTemplate.data("view");
            tagViewFrom(viewTemplate, viewName);
            clonedTemplate = $(document.importNode(viewTemplate[0], /*deep*/ true));
            viewTemplate.empty();
            shimsToParse = viewTemplate.data("isGeneric") ? parsed._rootViewShims :
                    getViewShims(viewName) || parsed._rootViewShims;

            parseView({
                viewName: viewName,
                template: clonedTemplate,
                shims: shimsToParse,
                parsed: parsed,
                collectionItemViewNames: collectionItemViewNames
            });
        });
    }

    function isATemplate(el) {
        var el = el[0];                     // IE SUPPORT (for selects and tables)
        return el.tagName === "TEMPLATE" || el.hasAttribute("template") ? true : false;
    }

    function getViewShims(name) {
        try {
            return context.get(name, /*raw*/ true).prototype.shims;
        } catch (e) {
            debugger;
        }
    }

    
    // parses and determines shims for render
    // records this on the parsed data object
    // args: viewName, template, shims, parsed, collectionItemViewNames
    function parseView(args) {
        shims.parse(args.template, args.shims); 
        args.parsed[args.viewName] = {
            template: args.template,
            shims: shims.determineShimsForRender(args.template, args.shims),
            data: args.template.data(),
            collectionItemViewNames: args.collectionItemViewNames
        };
    }

    function tagCollapseAndParse(viewName, el, parsed) {

        // tag and collapse children
        tagGenericViewTemplates(el);
        collapseChildViews(el, parsed);

        // tag and record root
        tagViewFrom(el, viewName);
        parseView({
            viewName: viewName,
            template: el,
            shims: parsed._rootViewShims,
            parsed: parsed
        });
    }

    
    // walk the template children and parse each node
    // returns an array of view names for each child
    function parseCollectionTemplateViews(viewTemplate, parsed) {
        var viewNames = [],
            children,
            templateViewEl, // can be multiple siblings
            nextName,
            i;

        if (viewTemplate[0].tagName === "TEMPLATE") {

            children = $('<div/>').append(viewTemplate[0].content).children();
            for (i = 0; i < children.length; i++) {
                nextName = viewFactory.nextGenericName();
                templateViewEl = children.eq(i);
                tagCollapseAndParse(nextName, templateViewEl, parsed);
                viewNames.push(nextName);
            }

        } else {

            // IE SUPPORT (for selects and tables)
            // this is a mock template; an item with a [template] attribute

            nextName = viewFactory.nextGenericName();
            templateViewEl = $(document.importNode(viewTemplate[0], true)).removeAttr("template");
            tagViewFrom(templateViewEl, nextName);
            parseView({
                viewName: nextName,
                template: templateViewEl,
                shims: parsed._rootViewShims,
                parsed: parsed
            });
            viewNames.push(nextName);
        }        

        return viewNames;
    }
};


bbext.service("templateParser", [
	"rootViewCache",
	"context",
	"shims",
    "viewFactory",
	bbext.templateParser
]);
