
/*
Options:
	model - Page
*/
PageEditor.UICMenu = Backbone.View.extend({
	
	className: "uic-menu",
	
	initialize: function () {
		/// <summary>
		/// options - { uic:, type: }
		/// uic - the el of the uic
		/// type - header, aside, or content
		///</summary>
		JstViewExtension.extend(this);
		DisposeViewExtension.extend(this);
	},
	
	events: {
		"click span": function (event) {
			var el = $(event.target),
				uicel = el.closest(".uic"),
				uicid = uicel.attr("id");

			if (el.hasClass("icon-plus")) {
				this.changeHeader();
				return;
			} else if (el.hasClass("icon-remove")) {
				PageEditor.deleteComponent(this.model, uicid);
				return;
			} else if (el.hasClass("icon-columns")) {
				this.changeLayout(uicid);
			}
		}
	},
	
	render: function () {
		var type = this.options.type;
		
		this.template("PageEditor-UICMenu", this.$el)();
		if (type === "header") {
			this.$el.find(".icon-move").hide();
			this.$el.find(".icon-columns").hide();
			this.$el.find(".icon-remove").hide();
		} else if (type === "aside") {
			this.$el.find(".icon-plus").hide();
			this.$el.find(".icon-columns").hide();
		} else { // content
			this.$el.find(".icon-plus").hide();
		}

		return this;
	},
	
	changeHeader: function () {
		var view = new PageEditor.AddComponentView({
			model: this.model,
			type: "header"
		});
		view.render();
	},
	
	changeLayout: function (uicid) {
		var view = new PageEditor.ChangeLayoutView({
			model: this.model,
			uicid: uicid
		});
		view.render();
	},
	
	dispose: function () {
		DisposeViewExtension.dispose.apply(this);
	}
});