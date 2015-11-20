

// viewRenderer
// creates a view with the viewFactory
// allows for the model on the view to be a promise or contain promises
//     as properties that are resolved before rendering.
function viewRenderer(viewFactory, $) {

    return {
        render: function (name, options) {
            // create the view
            var view = viewFactory.create(name, options),
				render = function () {
				    view.render();
				};

            // wait for the view to load a model
            load(view).then(render);

            return view;
        }
    };

    function load(view) {
        var dfds = [],
			model = view.model;

        if (model) {
            if (model.then) {
                dfds.push(model);
            } else {
                $.each(model, function (name, prop) {
                    if (prop && prop.then) {
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

context.module("bbext").service("viewRenderer", ["viewFactory", "$", bbext.viewRenderer = viewRenderer]);