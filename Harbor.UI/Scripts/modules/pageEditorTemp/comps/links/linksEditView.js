
links.view("linksEditView", {
	render: function () {
		this.$el.css("font-weight", "bold");
		/*
			prepend with:
			<div class="quiet">foo23</div>
	
			foreach .menulist
			hide h2
			add link to remove the menulist (with delete icon?)
			add text input for title
			prepend each <li> with a [+] move icon
			append each <li> with a [-] delete icon
	
			append with:
			<div><span class="icon-add">Add section</span></div>
			<button class="lound">Save</button>
		*/
	},
	
	onClose: function () {
		this.$el.css("font-weight", "normal");
	}
});