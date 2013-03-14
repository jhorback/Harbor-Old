
PageSettings.SettingsView = Application.View.extend({
	
    pagePreviewView: null,
    pagePreviewModel: null,
    
    menu: null,

    initialize: function () {
		this.listenTo(this.model.template, "change", this.templateChange);
		this.listenTo(this.model, "change", this.pageChange);

		// save events
		this.listenTo(this.model, "change:published", this.saveModel);
		this.listenTo(this.model, "change:title", this.saveModel);
		this.listenTo(this.model.template, "change", this.saveModel);
		this.listenTo(this.model.template, "change:published", this.saveModel);
		this.listenTo(PageSettings.events, "modal:opened", function () {
		    this.menu && this.menu.close();
		});
		this.listenTo(PageSettings.events, "modal:closed", this.render);

		this.pagePreviewModel = new PageSettings.PagePreviewModel({ page: this.model });
	},
	
	events: {
		"click #page-delete": function () {
			this.deletePage();
		}
	},

	render: function () {
	    var menu;
	    
	    this.template("PageSettings-Settings", this.$el)();
	    
        this.menu = new Menu(this.$el, {
	        transition: "none"
	    });

		this.bindModelToView(this.model, this.$(".page-header"));
		this.bindModelToView(this.model, this.$("#settings-visibility"));
		this.bindModelToView(this.model.template, this.$("#settings-layout"));
		
		if (this.pagePreviewView) {
		    this.pagePreviewView.close();
		}
		this.pagePreviewView = new PageSettings.PagePreviewView({
		    el: this.$("#settings-page-preview"),
		    model: this.pagePreviewModel
		});
		this.pagePreviewView.render();
		return this;
	},
	
	templateChange: function () {
		PageSettings.events.trigger("layout:updated");
	},
	
	pageChange: function () {
		PageSettings.events.trigger("page:updated");
	},
	
	saveModel: function () {
		AjaxRequest.handle(this.model.save());
	},
	
	deletePage: function () {
		var answer = confirm("Are you sure you want to delete this page?");
		if (!answer) {
			return;
		}
		this.model.destroy().then(function () {
			history.back();
		});
	}
});