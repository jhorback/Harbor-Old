/*
 *  A view will be created and given the associated model. componentType + "View";
 *  
 *  A component can define callbacks for all states:
 *      init - when the component is created (on page edit)
 *      onCreate - called if the user is adding a new component to the page
 *                 open is called first so this.view will exist.
 *      onOpen - called when the user has focused the compenet to make changes
 *      onClose - called when the user has finished making changes to the view
 *                this will also call a refresh from server
 *      onRemove - called when the page is done editing.
 *
 *  create, open, close, and remove methods can be overridden in any component.
 *
 *  Component properties
 *      type - the type of the component, i.e. content, aside, header
 *      componentType - the key of the component, i.e. text, image, links, etc.
 *      $el - the jquery element which contains the component
 *      uicid
 *      page
 *      componentModel - created from componentType + "Model" (by the template)
 *      model - alias for componentModel
 *      templateRenderer
 */
pageEditor.pageComponent = function (
	console,
	appurl,
	context,
	modelFactory,
	currentPageRepo,
	templateRenderer
) {
	
	var pageComponentPrototype = {
		
		initComponentModel: function () {
			// set up binding on the page properties
			var pageProps = this.componentModel.syncPageProperties || [];
			_.each(pageProps, function (attrName) {
				this.componentModel.on("change:" + attrName, function (model, value) {
					this.setProperty(attrName, value);
				}, this);
			}, this);

			this.model = this.componentModel;
		},
			
		setProperty: function (name, value) {
			this.page.setProperty(this.uicid + "-" + name, value);
		},

		getProperty: function (name) {
			var value = this.page.getProperty(this.uicid + "-" + name);
			return value;
		},

		save: function () {
			return currentPageRepo.saveCurrentPage();
		},

		create: function () {
			this.open();
			this.onCreate && this.onCreate();
		},

		open: function () {
			this.view = this.templateRenderer.render(this.componentType + "View", {
				model: this.model,
				uicid: this.uicid
			});
			this.view.saveCurrentPage = currentPageRepo.saveCurrentPage;
			this.$el.empty().html(this.view.$el);
			this.onOpen && this.onOpen();
		},

		// called when done editing this component
		// clean up from create or close
		close: function () {
			this.view.close({ remove: false });
			this.onClose && this.onClose();
		},
		
		// called when the user is done editing the page
		// clean up from constructor/init
		remove: function () {
			this.onRemove && this.onRemove();
		}
	};

	return function (name, construct) {

		var pageComponentConstructor = function (options) {
			this.type = options.type;
			this.componentType = options.key;
			this.$el = options.$el;
			this.uicid = options.uicid;
			this.page = options.page;
			this.componentModel = options.componentModel;
			this.initComponentModel();
			this.templateRenderer = templateRenderer;
			context.call(construct, [], this);
			this.init && this.init();
		};
		
		pageComponentConstructor.prototype = pageComponentPrototype;
		_.extend(pageComponentConstructor.prototype, construct.prototype);

		return pageComponentConstructor;
	};
};


pageEditor.construct("pageComponent", [
	"console",
	"appurl",
	"context",
	"modelFactory",
	"currentPageRepo",
	"templateRenderer",
	pageEditor.pageComponent
]);


pageEditor.pageComponent("defaultPageComponent", {});