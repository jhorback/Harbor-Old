var ContentComponent = function (options) {
	this.type= options.type;
	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
};

ContentComponent.extend = Backbone.Model.extend;

_.extend(ContentComponent.prototype, {
	create: function () {
		// called when a new instance is added from the client
		console.warn("Component type not implemented.");
	},
	
	open: function () {
		// called when this instance has been opened for edit
	},
	
	close: function () {
		// called when this instance has been closed for edit
	},
	
	destroy: function () {
		// called when the page exits edit mode
	}
});