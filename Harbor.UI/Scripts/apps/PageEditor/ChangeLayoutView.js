
/*
Options:
	model - Page
	uicid - the uicid of the content component to update
*/
PageEditor.ChangeLayoutView = Application.View.extend({
	
	initialize: function () {
		this.component = this.getPageContentComponent(this.options.uicid);
		this.viewModel = new PageEditor.ChangeLayoutViewModel();
		this.viewModel.setClassNames(this.component.classNames);
	},
	
	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.save();
		}
	},
	
	render: function () {
		this.template("PageEditor-ChangeLayout", this.$el)();
		this.showDialog(new Dialog(this.$el, {
			title: "Layout content",
			modal: true
		}));
		this.bindModelToView(this.viewModel, this.$el);
	},
	
	getPageContentComponent: function (uicid) {
		var comp = _.find(this.model.template.get("content"), function (item) {
			return item.uicid === uicid;
		});
		return comp;
	},
	
	save: function () {
		this.component.classNames = this.viewModel.getClassNames();
		this.model.template.trigger("change");
		$("#" + this.component.uicid).removeClass().addClass(this.component.classNames.join(" ") + " uic");
		AjaxRequest.handle(this.model.save());
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

PageEditor.ChangeLayoutViewModel = Application.Model.extend({
	defaults: {
		colClassName: "col1",
		clear: true,
		clearDisabled: true,
		contentPositionClassName: "text-left"
	},
	
	clearDisabled: {
		get: function () {
			return this.get("colClassName") === "col1";
		},
		bind: ["colClassName"]
	},

	clear: {
		get: function (val) {
			if (this.get("colClassName") === "col1") {
				return true;
			}
			return val;
		},
		clear: ["colClassName"]
	},
	
	getClassNames: function () {
		var classNames = [],
			contentPositionClassName = this.get("contentPositionClassName"),
			colClassName = this.get("colClassName");
		
		classNames.push(colClassName);
		if (this.get("clear") === true && colClassName !== "col1") {
			classNames.push("clear");
		}
		if (contentPositionClassName !== "text-left") {
			classNames.push(contentPositionClassName);
		}
		return classNames;
	},
	
	setClassNames: function (classNames) {
		var self = this;

		this.set("clear", false);
		_.each(classNames, function (className) {
			if (className === "col1" || className === "col2" ||
				className === "col4" || className === "col3" || className === "col3-2") {
				self.set("colClassName", className);
			} else if (className === "clear") {
				self.set("clear", true);
			} else {
				self.set("contentPositionClassName", className);
			}
		});
	}
});