
var PageComponent = function (options) {
	this.type= options.type;
	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
	
	this.initialize();
};

PageComponent.extend = Backbone.Model.extend;

_.extend(PageComponent.prototype, {
	constructModel: function (modelType) {
		/// <summary>
		/// Construct the model using the 'defaults' and add the uicid as properties.
		/// Sets up change events that propagate back to the page.
		/// </summary>

		var model = new modelType({ uicid: this.uicid });
		model.save = _.bind(this.save, this);
		_.each(model.pageProperties, function (defaultValue, attrName) {
			var attrValue = this.getProperty(attrName);
			model.set(attrName, attrValue === null ? defaultValue : attrValue );
			model.on("change:" + attrName, function (model, value) {
				this.setProperty(attrName, value);
			}, this);
		
		}, this);
		model.page = this.page;
		return model;
	},
	
	setProperty: function (name, value) {
		this.page.setProperty(this.uicid + "-" + name, value);
	},
	
	getProperty: function (name) {
		return this.page.getProperty(this.uicid + "-" + name);
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