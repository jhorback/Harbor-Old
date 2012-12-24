
/*
options:
	model - Page
*/
PageEditor.EditView = Backbone.View.extend({
	initialize: function () {
		var view = this;
		JstViewExtension.extend(this);
		DisposeViewExtension.extend(this);

		this.$el.delegate(".uic", "click", function () {
			view.toggleCtrl($(this));
		});

		_.bindAll(this, ["updateOrder"]);
	},

	selectedUICEl: null,
	currentUICMenu: null,
	
	render: function () {
		var self = this,
			asideEl = this.$(".page-aside"),
			contentEl = this.$(".page-content");

		asideEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
		contentEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
		asideEl.add(contentEl).sortable({
			handle: ".icon-move",
			items: ".uic",
			revert: false,
			containment: "document",
			tolerance: "pointer",
			update: this.updateOrder
		});
		
		this.$(".uic-add").click(function () {
			var type = $(this).closest(".page-content").length > 0 ? "content" : "aside";
			self.addComponent(type);
		});

		this.track(new ModelBinder(this.model, this.$(".page-header")));
		return this;
	},

	updateOrder: function (event, ui) {
		var isContent, container, typeArray, newTypeArray;

		isContent = true;
		container = ui.item.closest(".page-content");
		if (container.length === 0) {
			isContent = false;
			container = ui.item.closest(".page-aside");
		}
		typeArray = this.model.template.get(isContent ? "content" : "aside");
		newTypeArray = [];
		container.find(".uic").each(function (index, uicEl) {
			var uic;
			uicEl = $(uicEl);
			uic = _.find(typeArray, function (item) {
				return item.uicid === uicEl.attr("id");
			});
			newTypeArray.push(uic);
		});

		this.model.template.set(isContent ? "content" : "aside", newTypeArray);
		AjaxRequest.handle(this.model.save());
	},
	
	addComponent: function (type) {
		var view = new PageEditor.AddComponentView({
			model: this.model,
			type: type
		});
		view.render();
		this.track(view);
	},
	
	toggleCtrl: function (uic) {
		if (this.selectedUICEl) {
			if (this.selectedUICEl === uic) {
				return;
			}
			this.hideCtrl(this.selectedUICEl);
		}
		this.selectedUICEl = uic;
		this.showCtrl(uic);
		PageEditor.openComponent(uic.attr("id"));
	},

	showCtrl: function (uic) {
		
		var type = "content";
		if (uic.closest(".page-header").length > 0) {
			type = "header";
		} else if (uic.closest(".page-aside").length > 0) {
			type = "aside";
		}
		
		this.currentUICMenu = new PageEditor.UICMenu({
			uic: uic,
			type: type,
			model: this.model
		});
		uic.append(this.currentUICMenu.render().el);
		uic.addClass("selected");
	},
	
	hideCtrl: function (uic) {
		this.currentUICMenu && this.currentUICMenu.dispose();
		uic.removeClass("selected");
	},
	
	dispose: function () {
		this.$(".uic-add").remove();
		this.$el.undelegate(".uic", "click");
		this.$(".page-aside").add(this.$(".page-content")).sortable("destroy");
		this.selectedUICEl && this.hideCtrl(this.selectedUICEl);
		this.currentUICMenu && this.currentUICMenu.dispose();
		Session.ViewExtension.dispose.apply(this, arguments);
	}
});