
/*
pageAdder options
	parentPageTypeKey - An optional page type used to filter and adjust the page type selection.
	onAddPage - a callback recieving the selected page as an argument.
	addPage - overrides the add page method and recieves the page model directly.
	          this component will not add the page or even close iteself.
*/
pageAdder.component("pageAdder", {
	el: "#dialog"
});
