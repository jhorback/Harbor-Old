var TextComponent = PageComponent.extend({

    create: function () {
        this.open();
    },

    open: function () {
        this.view = new TextComponent.View({
            el: this.$el,
            model: this.constructModel(TextComponent.TextModel)
        });

        this.view.render();
    },

    close: function () {
        this.view && this.view.close();
    }
});

TextComponent.View = Application.View.extend({
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
            this.model.set("text", html);
            this.model.page.updatePagePreviewText(this.uicid, html);
            save = this.model.save();
            AjaxRequest.handle(save);
        }

        ctr.destroyEditor && ctr.destroyEditor();
    }
});


TextComponent.TextModel = Application.Model.extend({
    pageProperties: {
        text: null
    },
    defaults: {
        text: null
    },
    text: {
        set: function (value) {
            // jch! - here - and also trying to get the preview to work again.
            if ($.trim(value) === "") {
                this.set("text", "[Add Text]");
            }
            return value;
        }
    }
});


PageEditor.registerComponent("text", TextComponent);
PageEditor.events.on("component:deleted", function (page, uicid) {
	debugger;
	page.deleteProperty(uicid + "-text");
});