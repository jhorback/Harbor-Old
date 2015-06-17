
// [type=search] -> trigger: "clearsearch"
// Fires a clearSearch event when clicking the 'x' on search input fields
$(document).delegate('[type=search]', 'mouseup', function(event) {
	var searchField = $(event.target),
		initialValue = searchField.val();

	setTimeout(function() {
		if (!searchField.val() && initialValue) {
            searchField.trigger('change');
			searchField.trigger('clearsearch');
		}
	}, 0);
});
