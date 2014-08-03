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
		initModel: function () {
			var temp, pageProps, modelProps, defaultProps, getDefaults, component;

			if (!this.model) {
				return;
			}

			temp = context.get(this.model, true);
			component = temp.prototype.component;
				
			// gather the default properties (to initialize the model with)
			pageProps = component.pageProperties;
			getDefaults = component.getDefaults;
			modelProps = this.componentModel.attributes || {};
			modelProps.id = this.uicid;
			_.each(pageProps, function (attrName) {
				var attrValue = this.getProperty(attrName);
				modelProps[attrName] = attrValue;
			}, this);

			if (getDefaults) {
				defaultProps = getDefaults(this.page, modelProps);
				if (defaultProps) {
					_.extend(modelProps, defaultProps);
				}
			}

			// create the model and give the page model and save method
			this.model = modelFactory.create(this.model, modelProps, { page: this.page });
			this.model.page = this.page;
			if (!this.model.save) {
				this.model.save = _.bind(this.save, this);
			}

			// set up binding on the page properties
			_.each(pageProps, function (attrName) {
				this.model.on("change:" + attrName, function (model, value) {
					this.setProperty(attrName, value);
				}, this);
			}, this);
		},
			
		replaceHtmlFromServer: function () {
			var el = this.$el,
				url = appurl.get("page/" + this.componentType +
					"?pageID=" + this.page.get("id") + "&uicid=" + this.uicid);
			
			$.ajax({
				url: url,
				dataType: "html"
			}).then(function (response) {
				el.empty().html(response);
			});
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
			this.initModel();
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