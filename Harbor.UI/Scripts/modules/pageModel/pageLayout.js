
pageModel.pageLayout = function () {
	
};

pageModel.pageLayout.prototype = {
	defaults:{
		id: null, 
		layoutIsCentered: null, 
		layoutIsReadable: null, 
		layoutHasNoSidebar: null, 
		headerKey: null, 
		headerData: null, 
		asideKey: null, 
		asideData: null
	},

	"[headerData]": {
		get: function (value) {
			return JSON.parse(value);
		},
		set: function (value) {
			return JSON.stringify(value);
		}
	},

	"[asideData]": {
		get: function (value) {
			return JSON.parse(value);
		},
		set: function (value) {
			return JSON.stringify(value);
		}
	}
};

pageModel.model("pageLayout", [
	"attrs",
	"options",
	pageModel.pageLayout
]);