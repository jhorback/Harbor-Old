
var navLinks = module("navLinks").use("bbext");


navLinks.model("navLinksModel", {
	defaults: {
		id: null,
		name: null,
		userName: null,
		sections: [] // title, links 
	}
});


navLinks.collection("navLinksCollection", {
	model: "navLinksModel",
	url: Application.url("api/navlinks")
});