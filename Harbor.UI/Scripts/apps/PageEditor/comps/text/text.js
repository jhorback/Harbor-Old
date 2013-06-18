
var text = module("text").use("pageComponent", "bbext");

text.component("text", function (viewFactory) {
	
	this.view = viewFactory.create("textView", {
		el: this.$el,
		model: this.model
	});
	
}, {
	$inject: ["viewFactory"],
	
    modelType: "textModel",

    create: function () {
        this.open();
    },

    open: function () {
        this.view.render();
    },

    close: function () {
        this.view.close();
    }
});

text.view("textView", {

    render: function () {
        var buttons = [
               "formatting", "|",
               "bold", "italic", "deleted", "underline", "|",
               "unorderedlist", "orderedlist", "outdent", "indent", "|",
               "horizontalrule", "|",
               "fontcolor", "backcolor", "|",
               "alignleft", "aligncenter", "alignright", "justify", "|",
               "html"
            ],
            richTextEl;

        this.renderTemplate("Comps-Text")(this.model.toJSON());

        richTextEl = this.$el.find(".richtext");
        
        richTextEl.redactor({
            focus: true,
            // air: true,
            // airButtons: buttons,
            buttons: buttons
        });
    },

    onClose: function () {
        var ctr = this.$el.find(".richtext");
        var redactor = ctr.data('redactor');
        var html, save;

        if (redactor) {
            html = ctr.getCode();
            if ($.trim($(html).text()) === "") {
                html = "";
            }

            this.model.set("text", html);
            this.model.page.updatePagePreviewText(this.model.get("id"), html);
            save = this.model.save();
            AjaxRequest.handle(save);
        }

        ctr.destroyEditor && ctr.destroyEditor();
    }
});

text.model("textModel", {
	component: {
		pageProperties: ["text"],
		
		getDefaults: function () {
			return {};
		}
	},
    defaults: {
        text: null
    }
});