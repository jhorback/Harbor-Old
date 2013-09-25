
pageEditor.component("addPageComponent");

// jch! - here
pageEditor.addPageComponentView = function (
	options,
	modelFactory,
	currentPageRepo,
	pageComponentRepo,
	dialogFactory
) {

	this.model = modelFactory.create("addPageComponentViewModel", {		
		componentType: this.options.type // "header", "content", "aside"
	});

	this.model.page = currentPageRepo.getCurrentPage();
	this.model.pageComponents = pageComponentRepo.getPageComponents();
	this.dialogFactory = dialogFactory;
};

pageEditor.addPageComponentView.prototype = {
	render: function () {
		var $el = this.$el,
		    type = this.options.type,
		    self = this;
		

		this.JST("PageEditor-AddComponent", this.model).then(function (result, model) {
			var components, selectEl;

			$el.html(result);
			self.showDialog(new Dialog($el, {
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
			self.model = model;
			self.bindModelToView(model.viewModel, $el);
		});
	},
	
	formSubmit: function (event) {
		event.preventDefault();
		this.save();
	},

	save: function () {
		PageEditor.addComponent(this.model.page,
			this.model.viewModel.get("pageComponentKey"),
			this.model.viewModel.get("componentType"));
		this.close();
	}
};

pageEditor.view("pageEditor.addPageComponentView", [
	"options",
	pageEditor.addPageComponentView
]);



