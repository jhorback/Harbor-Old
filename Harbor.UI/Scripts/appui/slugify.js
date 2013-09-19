
// turns a string into a url/id friendly slug.

function slugify (text) {
	text=text.replace(/[^-a-zA-Z0-9,&\s]+/ig,'');
	text=text.replace(/-/gi,"_");
	text=text.replace(/\s/gi,"-");
	return text;
}

appui.register("slugify", slugify, "function");