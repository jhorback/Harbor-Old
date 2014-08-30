/*
 * modelType - function that returns a component model
 *     which will be converted into a proxy to the page model.
 *     this.model will have:
 *         a page property
 *         a save method which calls save method on the page
 *         and changes will be bound to update page properties according to the uicid. 
 * getDefaults - use to fill the default properties of the model.
 *     defaults will be populated off of the uic properties
 *     defining this static method is useful for any live properties (on a page resource).
 */
pageEditor.pageComponent = function (console, appurl, context, _, $, modelFactory, currentPageRepo) {
	
	var pageComponentPrototype = {
		
		initComponentModel: function () {
			// set up binding on the page properties
			var pageProps = this.componentModel.syncPageProperties || [];
			_.each(pageProps, function (attrName) {
				this.model.on("change:" + attrName, function (model, value) {
					this.setProperty(attrName, value);
				}, this);
			}, this);
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
			// called when a new instance is added to the page
			console.warn("Component type not implemented.");
		},

		open: function () {
			// called when this instance has been opened for edit
		},

		close: function () {
			// called when done editing this component
			// clean up from create or close
		},
			
		remove: function () {
			// called when the user is done editing the page
			// clean up from constructor
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
			context.call(construct, [], this);
		};
		
		pageComponentConstructor.prototype = pageComponentPrototype;
		_.extend(pageComponentConstructor.prototype, construct.prototype);

		return pageComponentConstructor;
	};
};


pageEditor.construct("pageComponent", [
	"console", "appurl", "context", "_", "$", "modelFactory", "currentPageRepo",
	pageEditor.pageComponent]);


pageEditor.pageComponent("defaultPageComponent", {});