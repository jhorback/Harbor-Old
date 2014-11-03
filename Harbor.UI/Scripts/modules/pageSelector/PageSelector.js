/*
 *	pageSelector options
 *		filter - If not set, all pages will be shown. Can be: "products"
 *		createPage - If false, the select callback will be called without calling save on new pages.
 *		select - fn(page) - callback that recieves the selected page.
 *			Can check page.isNew() if allowPageAdd is true
 *		close - fn() - callback when the selector closes
 *		allowPageAdd - If true, displays a button (if an author) to create a new page.
 *	
 *		---when allowPageAdd is true ---
 *		parentPageTypeKey - An optional page type used to filter and adjust the page type selection.
 *		layoutPageTypeKey - Same as parentPageTypeKey. Use this when in the context of a page layout.
 *      newPageTypeFilter - An array of page types to filter by.
 *	}
 */
var pageSelector = context.module("pageSelector").use("bbext", "pageModel");


pageSelector.component("pageSelector", {
	region: "#frame-body"
});
