
pageEditor.changeLayoutViewModel = {
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
};


pageEditor.model("changeLayoutViewModel", pageEditor.changeLayoutViewModel);