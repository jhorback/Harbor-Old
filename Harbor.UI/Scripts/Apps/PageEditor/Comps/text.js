
// jch* - simple for now - could have a view associated with this if needed later
var TextComponent = function (options) {
	JstViewExtension.extend(this);

	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
	this.view = null;
};

TextComponent.prototype = {
	create: function () {
		this.template("Comps-Text", this.$el)();
	},

	open: function () {
		var buttons = [
			"formatting", "|",
			"bold", "italic", "deleted", "underline", "|",
			"unorderedlist", "orderedlist", "outdent", "indent", "|",
			"horizontalrule", "|",
			"fontcolor", "backcolor", "|",
			"alignleft", "aligncenter", "alignright", "justify", "|",
			"html"
		];

		this.$el.find(".richtext").redactor({
			focus: true,
			// air: true,
			// airButtons: buttons,
			buttons: buttons
		});	
	},

	close: function () {
		var ctr = this.$el.find(".richtext");
		var redactor = ctr.data('redactor');
		var html;
		
		if (redactor) {
			html = ctr.getCode();
			this.page.setProperty(this.uicid + "-text", html);
			AjaxRequest.handle(this.page.save());
		}
		
		ctr.destroyEditor && ctr.destroyEditor();
	},

	destroy: function () {
		// this.view.dispose();
		console.log("destroy text");
	}
};


PageEditor.registerComponent("text", TextComponent);
PageEditor.on("componentDeleted", function (page, uicid) {
	debugger;
	page.deleteProperty(uicid + "-text");
});

/*


var TextComponent = PageComponent.extend({
	create: function () {
		this.open();
	},

	open: function () {
		this.view = new TextComponent.View({
			el: this.$el,
			model: this.page
		});
		this.view.render();
	},

	close: function () {
		this.view.close();
	}
});


TextComponent.View = Application.View.extend({
	render: function () {
		this.renderTemplate("Comps-Text")();
		
		var buttons = [
			"formatting", "|",
			"bold", "italic", "deleted", "underline", "|",
			"unorderedlist", "orderedlist", "outdent", "indent", "|",
			"horizontalrule", "|",
			"fontcolor", "backcolor", "|",
			"alignleft", "aligncenter", "alignright", "justify", "|",
			"html"
		];

		this.$el.find(".richtext").redactor({
			focus: true,
			// air: true,
			// airButtons: buttons,
			buttons: buttons
		});	
	},
	
	onClose: function () {
		var ctr = this.$el.find(".richtext");
		var redactor = ctr.data('redactor');
		var html;
		
		if (redactor) {
			html = ctr.getCode();
			this.model.setProperty(this.uicid + "-text", html);
			AjaxRequest.handle(this.model.save());
		}
		
		ctr.destroyEditor && ctr.destroyEditor();
	}
});


PageEditor.registerComponent("text", TextComponent);
PageEditor.on("componentDeleted", function (page, uicid) {
	debugger;
	page.deleteProperty(uicid + "-text");
});*/