
/*
pageSelector options
	filter - If not set, all pages will be shown. Can be: "products"
	addFilterPageType - The page type to use for the add page type filter.
	select - fn(page) - callback that recieves the selected page.
	close - fn() - callback when the selector closes
}
*/

var pageSelector = context.module("pageSelector").use("bbext", "pageModel");


pageSelector.component("pageSelector", {
	region: "#frame-body"
});
