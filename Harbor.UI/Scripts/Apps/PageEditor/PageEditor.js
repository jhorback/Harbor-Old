
// The EdtitView and SettingsView are the primary views
// which are toggled by the PageLaoder 
var PageEditor = {
	
	currentPage: null, // set by the page loader - could use init and destroy methods instead.

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
				page: PageEditor.currentPage
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
	}
};

_.extend(PageEditor, Backbone.Events);
Region.createRegions(PageEditor);


// update the class names if the layout is updated
PageEditor.on("updateLayout", function () {
	var classNames = PageEditor.currentPage.getLayoutClassNames();
	var el = PageLoader.regions.page.getEl();
	el.find(".page-header")	.removeClass().addClass("page-header").addClass(classNames);
	el.find(".page-body").removeClass().addClass("page-body").addClass(classNames);
});

PageEditor.on("updatePage", function () {
	var el = PageLoader.regions.page.getEl();
	el.find("[data-bind=title]").html(PageEditor.currentPage.get("title"));
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