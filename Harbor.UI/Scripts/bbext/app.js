

// app
// call app.render() in the app start callback to render the root app view.
function bbextapp($, appName, templateRenderer) {
	var appView;

	return {
		name: appName,
		render: function (model) {
			appView = templateRenderer.render(appName, model);
		},
		close: function () {
			appView && appView.close();
		}
	};
}

module("bbext").service("app", ["$", "appName", "templateRenderer", bbextapp]);