
var PageComponent = function (options) {
	this.type= options.type;
	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
    
	if (this.modelType) {
	    if (_.isFunction(this.modelType)) {
	        this.modelType = this.modelType();
	    }
	    // Construct the model using the 'defaults' and add the uicid as properties.
	    // Sets up change events that propagate back to the page.
        this.model = new this.modelType({ uicid: this.uicid });
        this.model.save = _.bind(this.save, this);
        _.each(this.model.pageProperties, function (defaultValue, attrName) {
            var attrValue = this.getProperty(attrName);
            this.model.set(attrName, attrValue === null ? defaultValue : attrValue);
            console.warn("SETUP:", this.model.cid, this.uicid);
            this.model.on("change:" + attrName, function (model, value) {
                console.warn("CHANGE:", model.cid);
                console.log(model.toJSON(), this.uicid, this.model.toJSON());
                this.setProperty(attrName, value);
            }, this);
        }, this);
        this.model.page = this.page;
    }
	this.initialize();
};

PageComponent.extend = Backbone.Model.extend;

_.extend(PageComponent.prototype, {
    
	setProperty: function (name, value) {
	    console.log(this.uicid + "-" + name, value, this.pcid); //jch! - testing - remove
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