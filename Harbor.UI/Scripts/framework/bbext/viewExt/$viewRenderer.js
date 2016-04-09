//
// viewRenderer
//
//  render(name, options, renderOptions)
//     uses the templateParser to parse sub views and shims (this is done once).
//     then calls render on each child view in order using the viewFactory + renderViewExt.
// 
// name - the name of the view
// 
// options
//     - all options are passed to the view when creating it
//     - insertAfterTemplate: If true, the view will be inserted
//           into the DOM after its source template element.
// 
// renderOptions
//     These options are used internally to help build the template tree.
//     - sourceTemplate - Used as a cache for child views to get their templates and shims.
//     - isParsedView - if true, just creates the view and calls render (sub views / shims are already parsed).
//     - fromServer - set to true if the initial markup is from the server
// 
// rootModel - (deprecated; handled now by the aggregate extension)
//     a rootModel property is added to the options (if a model is defined)
//     and after view rendering for child views to reference.
//
bbext.viewRenderer = function (
	rootViewCache,
	templateParser,
	viewFactory,
	console
 ) {

	return {
		render: function (name, options, renderOptions) {
		    var sourceTemplate,
				view;

            renderOptions = renderOptions || {};
            options = options || {};

            if (renderOptions.fromServer) {
                renderOptions.sourceTemplate = options.el;
                templateParser.parseTemplateFromServer(name, renderOptions.sourceTemplate);
                renderOptions.isParsedView = true;
            }

		    // render only pre-parsed views
            if (renderOptions.isParsedView) {
		        view = renderView(name, options, renderOptions);
		        return view;
		    }

            // locate the source template
		    sourceTemplate = renderOptions.sourceTemplate ?
                renderOptions.sourceTemplate :
                rootViewCache.get(name);

		    // parse all sub views and shims
            sourceTemplate && templateParser.parseTemplate(sourceTemplate);
            
		    // render the root template -> which renders the tree
		    options.rootModel = options.model;
		    view = this.render(name, options, {
		        sourceTemplate: sourceTemplate,
		        isParsedView: true
		    });
            
            // rootModel is deprecated (handled now by the aggregate extension).
		    if (view.model) {
		        view.rootModel = view.model;
		        view.model.rootModel = view.rootModel;
		    }

		    if (options.insertAfterTemplate === true) {
		        console.log("viewRenderer: Inserting the root template after the template element.");
		        sourceTemplate.after(view.$el);
		    }

		    return view;
		}
	};
	

    // create the view and call render
	function renderView(name, options, renderOptions) {
	    // create the view
	    var view = viewFactory.create(name, options);

	    if (view.model && view.model.waitForViewModelPromises) {	        
	        waitForViewModelPromises(view).then(function () {
	            view.fromServer = view.fromServer || renderOptions.fromServer;
	            view.render(renderOptions);
	        });
	    } else {
	        view.render(renderOptions);
	    }	    

	    return view;
	}

    // deprecated
	function waitForViewModelPromises(view) {
	    var dfds = [],
			model = view.model,
            warn = "view rendering deferred models are deprecated"; 

	    if (model) {
	        if (model.then) {
	            console.warn(warn);
	            dfds.push(model);
	        } else {
	            $.each(model, function (name, prop) {
	                if (prop && prop.then) {
	                    console.warn(warn);
	                    dfds.push(prop.then(function (val) {
	                        model[name] = val;
	                    }));
	                }
	            });
	        }
	    }

	    return $.when.apply($, dfds);
	}
}

bbext.service("viewRenderer", [
	"rootViewCache",
	"templateParser",
	"viewFactory",
	"console",
	bbext.viewRenderer
]);
