
/*
pageAdder options : {
	addPage: function (page) { }
}

If defining the addPage method, this component will simply pass the page model.
It will not add the page or even close the dialog.
There will also be server validation on the page name.
*/
pageAdder.component("pageAdder", {
	el: "#dialog"
});
