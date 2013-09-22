
app("pageEditor").use("links", "navLinks", "image", "pageLink", "text", "title").use("appui");


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
	
	dialogRegion: new Region(),

	regions: {
		page: "#page",
		modal: "#page-modal"
	},
	
	getComponent: function (uicid) {
		var comp = PageEditor.components[uicid],
			type,
			$el,
			options;
		
		if (!comp) {
			$el = $("#" + uicid);
			type = $el.data("type");
			
			options = {
				type: type, // used for the getHtml call
				uicid: uicid,
				$el: $el,
				page: this.currentPage
			};
			
			app("pageEditor").call(["context", function (context) {
				comp = context.instantiate(type, [options]);
			}]);
			
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


