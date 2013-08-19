

// app
// call app.render() in the app start callback to render the root app view.
bbext.app = function bbextapp($, appName, templateRenderer) {
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
};

context.module("bbext").service("app", ["$", "appName", "templateRenderer", bbext.app]);