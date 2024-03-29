﻿/*
pageAdder options
	parentPageTypeKey - An optional page type used to filter and adjust the page type selection.
	layoutPageTypeKey - Same as parentPageTypeKey. Use this when in the context of a page layout.
	newPageTypeFilter - An array of page types to filter by.
	onAddPage - a callback recieving the selected page as an argument.
	createPage - if false, the page save is not called
*/
var pageAdder = context.module("pageAdder").use("bbext", "pageModel");

pageAdder.component("pageAdder", {
	region: "#frame-body"
});
