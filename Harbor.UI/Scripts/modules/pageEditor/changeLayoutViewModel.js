
pageEditor.changeLayoutViewModel = {
	defaults: {
		colClassName: "col1",
		clear: false,
		clearDisabled: false,
		contentPositionClassName: "text-left"
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
		return classNames.join(" ").split(" ");
	},
	
	setClassNames: function (classNames) {
		var self = this;

		if (_.isArray(classNames)) {
			classNames = classNames.join(" ");
		}
		classNames = classNames.split(" ");

		this.set("clear", false);
		_.each(classNames, function (className) {
			if (className === "col1" || className === "col2" ||
				className === "col5" || className === "col3" || className === "col3-2") {
				self.set("colClassName", className);
			} else if (className === "clear") {
				self.set("clear", true);
			} else {
				self.set("contentPositionClassName", className);
			}
		});
	}
};


pageEditor.model("changeLayoutViewModel", pageEditor.changeLayoutViewModel);