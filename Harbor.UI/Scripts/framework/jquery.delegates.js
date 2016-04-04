
// [type=search] -> trigger: "clearsearch"
// Fires a clearSearch event when clicking the 'x' on search input fields
$(document).delegate('[type=search]', 'mouseup', function (event) {
	var searchField = $(event.target),
		initialValue = searchField.val();

	setTimeout(function() {
		if (!searchField.val() && initialValue) {
            searchField.trigger('change');
			searchField.trigger('clearsearch');
		}
	}, 0);
});

// [role=button] -> trigger: "click"
// provides elements whose role is button to recieve click events on space bar click
// will also add an "active" class name in lieu of the ":active" pseudo class.
$(document).delegate('[role=button]', 'keyup keypress', function (event) {
	var button;
	if (event.which == 32) { // which requires coersion
		button = $(event.target);
		if (event.type === "keypress") {
			event.preventDefault(); // keep from scrolling
			button.addClass("active");
		} else {
			button.removeClass("active");
			$(event.target).trigger("click");
		}
	}
});
