


PageEditor.AddComponentView = Application.View.extend({
	
	initialize: function () {
		// this.options.type: "header", "content", "aside"
		this.model = {
			page: this.model,
			viewModel: new PageEditor.AddComponentViewModel({ componentType: this.options.type }),
			components: PageEditor.PageComponents.getComponents()
		};
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.save();
		}
	},
	
	render: function () {
		var $el = this.$el,
			type = this.options.type,
			self = this,
			title = {
				header: "Change the header",
				aside: "Add content",
				content: "Add content"
			}[type];
		
		this.JST("PageEditor-AddComponent", this.model).then(function (result, model) {
			var components, selectEl;
			
			$el.html(result);
			this.showDialog(new Dialog($el, {
				title: title,
				modal: true
			}));

			if (type === "header") {
				$el.find("[for=pageeditor-component]").text("What kind of header do you want?");	
			}

			selectEl = $el.find("#pageeditor-component");
			components = model.components.where({ type: type });
			_.each(components, function (item) {
				selectEl.append('<option value="' + item.get("key") + '">' + item.get("name") + '</option>');
			});

			model.viewModel.set("pageComponents", components);
			model.viewModel.set("pageComponentKey", components[0].get("key"));
			this.model = model;
			this.bindModelToView(model.viewModel, $el);
		});
	},
	
	save: function () {
		PageEditor.addComponent(this.model.page,
			this.model.viewModel.get("pageComponentKey"),
			this.model.viewModel.get("componentType"));
		this.close();
	},
	
	showDialog: function (dialog) {
		this.dialog && this.dialog.destroy();
		this.dialog = dialog;
	},
	
	onClose: function () {
		this.dialog && this.dialog.destroy();
	}
});

PageEditor.AddComponentViewModel = Backbone.Model.extend({
	defaults: {
		componentType: null,
		pageComponentKey: null,
		//
		pageComponents: null, // need this passed in to get the description
		pageComponentDescription: null
	},
	
	initialize: function () {
		// this.pageComponents
		GetSetModelExtension.extend(this);
	},
	
	toJSON: function () {
		return _.pick(this.attributes, "pageComponentKey", "componentType");
	},
	
	pageComponentDescription: {
		get: function (value) {
			var pageComponentKey = this.get("pageComponentKey"),
				component,
				comps = this.get("pageComponents");

			if (!pageComponentKey) {
				return null;
			}

			if (!comps) {
				return value; // not loaded yet
			}
				
			component = new Backbone.Collection(comps).find(function (comp) {
				return comp.get("key") === pageComponentKey;
			});
			return component && component.get("description");
		}, 
		
		bind:  ["pageComponentKey"]
	}	
});