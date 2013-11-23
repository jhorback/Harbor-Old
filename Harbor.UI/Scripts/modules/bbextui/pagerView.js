


bbext.pagerView = function () {

};


bbext.pagerView.prototype = {	
	next: function () {
		this.model.next();
	},
	
	previous: function () {
		this.model.previous();
	}
};


bbext.view("pagerView", [
	"options",
	bbext.pagerView
]);