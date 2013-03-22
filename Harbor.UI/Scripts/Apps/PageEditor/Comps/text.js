﻿var TextComponent = PageComponent.extend({

    modelType: function () {
        return TextComponent.TextModel;
    },

    initialize: function () {
        this.view = new TextComponent.View({
            el: this.$el,
            model: this.model
        });
    },

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
            if ($.trim($(html).text()) === "") {
                html = "";
            }
            this.model.set("text", html);
            this.model.page.updatePagePreviewText(this.model.get("uicid"), html);
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
    }
});


PageEditor.registerComponent("text", TextComponent);