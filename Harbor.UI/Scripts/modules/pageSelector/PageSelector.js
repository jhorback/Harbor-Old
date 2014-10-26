
/*
pageSelector options
	filter - If not set, all pages will be shown. Can be: "products"
    allowPageAdd - If true, displays a button (if an author) to create a new page.
	addFilterPageType - The page type to use for the add page type filter.
	createPage - If false, the select callback will be called without calling save on new pages.
	select - fn(page) - callback that recieves the selected page.
		Can check page.isNew() if allowPageAdd is true
	close - fn() - callback when the selector closes
}
*/

var pageSelector = context.module("pageSelector").use("bbext", "pageModel");


pageSelector.component("pageSelector", {
	region: "#frame-body"
});
