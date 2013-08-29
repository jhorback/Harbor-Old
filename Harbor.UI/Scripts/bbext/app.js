

// app
// call app.render() in the app start callback to render the root app view.
bbext.app = function bbextapp($, appName, templateRenderer, console) {
	var appView;

	return {
		name: appName,
		render: function (model) {
			console.group("app.render:", appName);
			appView = templateRenderer.render(appName, model);
			console.groupEnd();
		},
		close: function () {
			appView && appView.close();
		}
	};
};

context.module("bbext").service("app", ["$", "appName", "templateRenderer", "console", bbext.app]);