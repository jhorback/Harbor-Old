

pageAdder.pageAdderView = function (
	options,
	modelFactory,
	//selectlistFactory,
	queryHandler,
	commandHandler
) {
	this.modelFactory = modelFactory;
	//this.selectlistFactory = selectlistFactory;
	this.queryHandler = queryHandler;
	this.commandHandler = commandHandler;
}


pageAdder.pageAdderView.prototype = {
	initialize: function () {
		this.model = this.modelFactory.create("pageAdderViewModel", {});
		
		this.on("component:detached", this.close);

		this.queryHandler.fetch(this.model.pageTypes, {
			parentPageTypeKey: this.options.parentPageTypeKey
		});	
	},

	onRender: function () {
		var model = this.model;

		//this.selectlistFactory.create(this.$el.find(".selectlist"), {
		//	change: function (event, info) {
		//		model.set("pageTypeKey", info.value());
		//	}
		//});
	},

	submitForm: function (event) {
		event.preventDefault();

		if (!this.isModelValid()) {
			return;
		}

		this.addPage();
	},

	addPage: function () {
		var self = this,
			page = this.model;

		if (this.options.createPage === false) {
			this.options.onAddPage && this.options.onAddPage(page);
			return;
		}

		// this.model
		// title, pageTypeKey
		//saveModel: function (model, attrs, options, handler, context) { // jch! - don't like null, null here
		this.commandHandler.saveModel(page, null, {
			clientError: function (response) {
				self.displayErrors(response.errors);
			},
			success: function () {
				var url;

				if (this.options.onAddPage) {
					this.options.onAddPage(page);
				} else {
					url = page.getUrl();
					window.location = url;
				}
			}
		}, this);
	},

	cancel: function () {
		this.close();
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	}
};


pageAdder.view("pageAdderView", [
	"options",
	"modelFactory",
	//"selectlistFactory",
	"queryHandler",
	"commandHandler",
	pageAdder.pageAdderView
]);