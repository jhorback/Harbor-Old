/*
 *
 * Keeps the template content row markup and add content button positioning
 *
 */
pageEditor.contentRowUpdater = function (console) {
	var rowTemplate = '<div class="row"/>';
	
	return {
		update: function (pageContentEl, pageTemplate) {
			if (needsUpdate(pageContentEl)) {
				reWrapRows(pageContentEl);
				this.positionUicAddButton(pageContentEl, pageTemplate);
			}
		},

		positionUicAddButton: function (pageContentEl, pageTemplate) {
			var uicAddButton = pageContentEl.find(".uic-add");
			pageTemplate.attributes.prependContentByDefault ?
				pageContentEl.find(".row:first").prepend(uicAddButton.detach()) :
				pageContentEl.find(".row:last").append(uicAddButton.detach());
		}
	};


	function reWrapRows(pageContentEl) {
		var uics = pageContentEl.find(".uic"),
			currentRow;

		console.info("REWRAP ROWS");
		
		//	unwrap all rows then loop through all content and put them in rows
		uics.unwrap();
		
		currentRow = $(rowTemplate).appendTo(pageContentEl);
		$.each(uics, function (index, uic) {
			uic = $(uic);
			if (index !== 0 && uic.hasClass("clear") === true) {
				currentRow = $(rowTemplate).appendTo(pageContentEl);
			}
			currentRow.append(uic.detach()); 
		});
	
		// need to also move the uic-add guy		
	}

	
	function needsUpdate(pageContentEl) {
		var clearUics, rows,
		    allClearUicsAreFirst = true,
		    allRowsStartWithAClear = true;

		// all uic's with a clear class are first
		clearUics = pageContentEl.find(".uic.clear");
		clearUics.each(function (index, uic) {
			uic = $(uic);
			if (uic.index() !== 0) {
				console.info("CONTENT ROWS NEED UPDATE: Clear UIC is not first. UICID: ", uic.attr("id"));
				allClearUicsAreFirst = false;
				return false;
			}
			return true;
		});
		
		if (allClearUicsAreFirst === false) {
			return true;
		}

		// all rows (except first) have the first uic with a clear class
		rows = pageContentEl.find(".row");
		rows.each(function (index, row) {
			row = $(row);
			if (index > -1 && row.find(".uic:first-child").hasClass("clear") === false) {
				console.info("CONTENT ROWS NEED UPDATE: Row does not have a clear first-child. Row Index: ", index);
				allRowsStartWithAClear = false;
				return false;
			}
			return true;
		});

		return allRowsStartWithAClear === false;
	}
};


pageEditor.service("contentRowUpdater", [
	"console",
	pageEditor.contentRowUpdater
]);