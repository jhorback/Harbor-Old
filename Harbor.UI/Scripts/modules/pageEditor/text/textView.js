

pageEditor.textView = function (options, currentPageRepo) {

	this.currentPageRepo = currentPageRepo;
};

pageEditor.textView.prototype = {
	onRender: function () {
		var buttons, richTextEl;

		buttons = [
			"formatting", "|",
			"bold", "italic", "deleted", "underline", "|",
			"unorderedlist", "orderedlist", "outdent", "indent", "|",
			"horizontalrule", "|",
			"fontcolor", "backcolor", "|",
			"alignleft", "aligncenter", "alignright", "justify", "|",
			"html"
		];
       
		richTextEl = this.$el.find(".richtext");
		richTextEl.css("position", "initial"); // gets rid of a wierd square box
		richTextEl.redactor({
			focus: true,
			// air: true,
			// airButtons: buttons,
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
				trimmedHtml = $.trim($(html).text());
				if (trimmedHtml === "") {
					html = "";
				}
			} catch (e) {}

			this.model.set("text", html);
			this.model.page.updatePagePreviewText(this.model.get("id"), html);
			this.currentPageRepo.saveCurrentPage();
		}

		ctr.destroyEditor && ctr.destroyEditor();
	}
};



pageEditor.view("textView", [
	"options",
	"currentPageRepo",
	pageEditor.textView
]);
