
/*
fileSelector options : {
	filter: "none | images",
	select: function (file) { },
	close: function () { },
}
*/

var fileSelector = context.module("fileSelector").use("bbext", "fileModel");

fileSelector.component("fileSelector", {
	regionEl: "#frame-body"
});