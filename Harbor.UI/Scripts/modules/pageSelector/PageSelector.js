
/*
pageSelector options : {
	select: function (page) { },
	close: function () { },
}
*/

var pageSelector = context.module("pageSelector").use("bbext", "pageModel");


pageSelector.component("pageSelector", {
	regionEl: "#frame-body"
});
