

pageEditor.textView = function (options, currentPageRepo) {

	this.currentPageRepo = currentPageRepo;
};

pageEditor.textView.prototype = {
	onRender: function () {
		var buttons, richTextEl;

		buttons = [
			"formatting", "|",
			"bold", "italic", "deleted", "underline", "link", "|",
			"unorderedlist", "orderedlist", "outdent", "indent", "|",
			"horizontalrule", "|",
			"fontcolor", "backcolor", "|",
			"alignleft", "aligncenter", "alignright", "justify", "|",
			"html"
		];
       
		richTextEl = this.$el.find(".richtext");	
		richTextEl.redactor({
			focus: true,
			fixed: true,
			//air: true,
			//airButtons: buttons,
			buttons: buttons
		});
	},

	onClose: function () {
		var ctr = this.$el.find(".richtext"),
		    redactor = ctr.data('redactor'),
		    html,
			trimmedHtml;

		if (redactor) {
			html = ctr.getCode();
			
			try {
				trimmedHtml = $.trim($("<div>" + html + "</div>").text());
				if (trimmedHtml === "") {
					html = "";
				}
			} catch (e) {}

			this.model.set("text", html);
			this.options.saveCurrentPage();
		}

		ctr.destroyEditor && ctr.destroyEditor();
	}
};



pageEditor.view("textView", [
	"options",
	"currentPageRepo",
	pageEditor.textView
]);
