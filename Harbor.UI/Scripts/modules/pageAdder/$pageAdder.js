/*
pageAdder options
	parentPageTypeKey - An optional page type used to filter and adjust the page type selection.
	onAddPage - a callback recieving the selected page as an argument.
	createPage - if false, the page save is not called
*/

var pageAdder = context.module("pageAdder").use("bbext", "currentUserModel", "pageModel");

pageAdder.component("pageAdder", {
	el: "#dialog"
});
