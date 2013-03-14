
var PageEditor = new Application({
    
    editView: null,
    currentPage: null,

    start: function (options) {
        this.currentPage = options.page;
        this.editView = new PageEditor.EditView({
            el: options.el,
            model: options.page
        });
        this.editView.render();
    },

	currentComponent: null, // holds the currently edited component

	components: {}, // hash of components by uicid
	
	componentTypes: {}, 
	
	dialogRegion: new Region(),

	regions: {
		page: "#page",
		modal: "#page-modal"
	},

	registerComponent: function (key, component) {
		/// <summary>
		/// component - a prototype containing create, open, close, destroy methods.
		///             the constructor will be passed an $el, page (model), uicid.
		/// </summary>
		PageEditor.componentTypes[key] = component;
	},
	
	getComponent: function (uicid) {
		var comp = PageEditor.components[uicid],
			compType,
			$el;
		if (!comp) {
			$el = $("#" + uicid);
			compType = PageEditor.componentTypes[$el.data("type")] || PageComponent;
			
			comp = new compType({
				type: compType,
				uicid: uicid,
				$el: $el,
				page: this.currentPage
			});
			PageEditor.components[uicid] = comp;
		}
		return comp;
	},
	
	openComponent: function (uicid) {
		var comp = PageEditor.getComponent(uicid);
		if (PageEditor.currentComponent === comp) {
			return comp;
		}
		
		if (PageEditor.currentComponent) {	
			PageEditor.currentComponent.close();
		}
		PageEditor.currentComponent = comp;
		comp.open();
		return comp;
	},

	createComponent: function  (uicid) {
		var comp = PageEditor.getComponent(uicid);
		comp.create();
		comp.$el.fadeIn();
		return comp;
	},

	dispose: function () {
		_.each(PageEditor.components, function (comp) {
			comp.close();
		});
		this.editView.dispose();
	}
});


PageEditor.PageComponent = Backbone.Model.extend({
	urlRoot: Session.url("api/pagecomponents"),
	idAttribute: "key",
	defaults: {
		key: null,
		type: null,
		name: null,
		description: null
	}
});


PageEditor.PageComponents = Backbone.Collection.extend({
	model: PageEditor.PageComponent,
	url: Session.url("api/pagecomponents")	
}, {
	loadDfd: null,

	getComponents: function () {
		var loadDfd = PageEditor.PageComponents.loadDfd;

		if (loadDfd !== null) {
			return loadDfd;
		}

		loadDfd = $.Deferred();
		var components = new PageEditor.PageComponents();
		AjaxRequest.handle(components.fetch()).then(function () {
			loadDfd.resolve(components);
		});
		
		PageEditor.PageComponents.loadDfd = loadDfd;
		return loadDfd;
	}
});