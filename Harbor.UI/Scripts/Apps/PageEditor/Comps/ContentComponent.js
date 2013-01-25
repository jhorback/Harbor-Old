var ContentComponent = function (options) {
	this.type= options.type;
	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
	
	this.initialize();
};

ContentComponent.extend = Backbone.Model.extend;

_.extend(ContentComponent.prototype, {
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