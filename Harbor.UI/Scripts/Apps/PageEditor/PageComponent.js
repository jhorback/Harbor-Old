/*
 * modelType - function that returns a component model
 *     which will be converted into a proxy to the page model.
 *     this.model will have:
 *         a page property
 *         a save method which calls save method on the page
 *         and changes will be bound to update page properties according to the uicid. 
 */
var PageComponent = function (options) {
	this.type= options.type;
	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
	
	this.initModel();
	this.initialize();
};

PageComponent.extend = Backbone.Model.extend;


_.extend(PageComponent.prototype, {

	initModel: function () {
		var pageProps, modelProps, defaultProps;

		if (this.modelType) {
			this.modelType = this.modelType();


			// gather the default properties (to initialize the model with)
			pageProps = this.modelType.pageProperties;
			modelProps = { id: this.uicid };
			_.each(pageProps, function (attrName) {
				var attrValue = this.getProperty(attrName);
				modelProps[attrName] = attrValue;
			}, this);
			
			if (this.modelType.getDefaults) {
				defaultProps = this.modelType.getDefaults(this.page, modelProps);
				if (defaultProps) {
					_.extend(modelProps, defaultProps);
				}
			}


			// create the model and give the the page model and save method
			this.model = new this.modelType(modelProps);
			this.model.page = this.page;
			this.model.save = _.bind(this.save, this);
			

			// set up binding on the page properties
			_.each(pageProps, function (defaultValue, attrName) {
				this.model.on("change:" + attrName, function (model, value) {
					this.setProperty(attrName, value);
				}, this);
			}, this);
		}
	},
    
	setProperty: function (name, value) {	    
		this.page.setProperty(this.uicid + "-" + name, value);
	},
	
	getProperty: function (name) {
	    var value = this.page.getProperty(this.uicid + "-" + name);
	    return value;
	},
	
	save: function () {
		return this.page.save();
	},
	
	initialize: function () {
		// called when the componenet is created (right before create or open).
	},
	
	create: function () {
		// called when a new instance is added from the client
		console.warn("Component type not implemented.");
	},
	
	open: function () {
		// called when this instance has been opened for edit
	},
	
	close: function () {
		// called when this instance or the page has been closed for edit
	}
});