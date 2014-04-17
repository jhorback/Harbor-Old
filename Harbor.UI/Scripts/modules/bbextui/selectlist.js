/*globals window, document, jQuery*/
/*!
 * ui.selectlist.js v1.0.1
 */
/*
* Descripiton:
*     Adds behavior to list selection. Works with any kind of list (i.e. tr, li, etc.).
*     Works with checkboxes, radiobuttons, and hyperlinks.
* 
* Dependencies:
*     jQuery
*     jQuery.ui.widget
*
* Options:
*    rowSelector - selector for the row. Default is tr (could be li, or ul, or whatever markup is used as the row). 
*    hideInputs - makes any inputs inside the list hidden.
*
* Events:
*     "change", "selectlistchange"
*      callback(event, info)
*      info:
*           checkedValues() - method that returns an array of selected input values.
* 
*    "valuechange", "selectlistvaluechange"
*    callback(event, info)
*    info:
*        value - the value of the input that was changed
*        checked - boolean to indicate the new value
*
* Methods:
*     clear() - clears the selection.
*     select(value, selected) - sets the selection of the input with the specified value.
*
* Note on events:
*     The primary difference between the two events is that "change" is triggered less frequently, however,
*     it does not report on what specifically changed. Whereas "valuechange" is triggered more
*     frequently but reports the information immediately.
*     "valuechange" was implemented to support the immediate binding of Backbone collections.
* 
* Notes:
*     [data-role=checkall] - An element with a data-role attribute set to checkall will be used to select/unselect all rows.
*     .selected - Selected rows will have a "selected" class name applied to them.
*     [data-selectable=false] - Keeps the row from being selected.
*         this does not keep the checkbox from being checked (disable the checkbox if that is needed).
* 
* Things to consider:
*	Focus and keyboard support.
*		Focus on outer container
*		arrow keys used to move inner selection
*		enter/spacebar to select
*/
$(function () {
   var doc = $(document);

   $.widget("bbextui.selectlist", {
	   options: {
		   rowSelector: "li",
		   hideInputs: false
	   },
	   
	   _checkall: null,
	   
	   _create: function () {
		   var self = this,
			   o = this.options;

		   this._values = {}; // hash of selected values

		   if (o.rowSelector === "li" && this.element[0].tagName.toLowerCase() === "table") {
			   o.rowSelector = "tr";
		   }

		   // this.element.attr("tabindex", 0); add this only when keyboard support is added

		   if (this.options.hideInputs) {
			   this.element.find(":input").hide();
		   }

		   this.element.bind("click.selectlist", $.proxy(this._clickList, this));

		   // select all checked items
		   this.element.find(":checked").each(function () {
			   var checkbox = $(this);
			   self.isRowSelectable(checkbox);
			   self.row(checkbox).addClass("selected");
			   updateValues.call(self, checkbox, true);
		   });

		   doc.bind("keydown.selectlist", $.proxy(this._documentKeyDown, this));
		   doc.bind("keyup.selectlist", $.proxy(this._documentKeyUp, this));

		   // implement checkall
		   this._checkall = this.element.find("[data-role=checkall]");
		   this.row(this._checkall).attr("data-selectable", false);
		   this._checkall.bind("click.selectlist", $.proxy(this._checkallClick, this));
	   },
	   
		clear: function () {
			this._checkall.prop("checked", false);
			this._checkallClick();
		},

		select: function (value, checked) {
			var input = this.element.find("input[value='" + value + "']");
			var isChecked = input.prop("checked");


			if (isChecked !== checked) {
				input.prop("checked", checked);
				updateValues.call(this, input, checked);
				isChecked = checked;
			}

			if (isChecked) {
				this.row(input).addClass("selected");
			} else {
				this.row(input).removeClass("selected");
			}
		},

		values: function () {
			var values = $.map(this._values, function(v, i){
				return i;
			});
			return values;
		},
	   
		_checkallClick: function () {
			 var rows = this.element.find("tbody " + this.options.rowSelector);
			 this._selectRange(rows.first(), rows.last(), this._checkall.prop("checked"));
		},
	   
	   _clickList: function (event) {
		   var selectable,
			   self = this,
			   target = $(event.target),
			   row = this.row(target);

		   if (this.isRowSelectable(target) === false) {
			   return;
		   }

		   // if we are clicking directly on a link or an input element
		   if (target.closest("a,:input").length > 0) {
			   if (target.is(":input")) {
				   if (target.is(":radio")) {
					   self._clickRadio(event, target);
				   } else if (target.is(":checkbox")) {
					   if (target.prop("checked")) {
						   row.addClass("selected");
						   updateValues.call(self, target, true);
					   } else {
						   row.removeClass("selected");
						   updateValues.call(self, target, false);
					   }
				   }
				   this._fireChange();
				   
					event.stopImmediatePropagation();
			   }
			  
			   return;
		   }		

		   selectable = row.find("input,a").first();
		   if (selectable.is(":radio") === true) {
			   self._clickRadio(event, selectable);
		   } else if (selectable.is(":checkbox")) {
			   self._clickCheckbox(event, selectable);
		   } else if (selectable.is("a")) {				
			   selectable.trigger("click");
		   }
	   },
	   
	   _documentKeyDown: function (event) {
		   if (event.shiftKey) {
			   this.disableSelection();
		   } else if (event.keyCode == 13 || event.keyCode == 32) {
			   $(event.target).trigger("click"); // click if enter or spacebar
		   }
	   },
	   
	   _documentKeyUp: function (event) {
		   if (!event.shiftKey) {
			   this.enableSelection();
		   }
	   },

	   row: function (el) {
		   /// <summary>Selects the row the element is contained in.</summary>
		   return el.closest(this.options.rowSelector);
	   },
	   
	   isRowSelectable: function (el) {
		   /// <summary>Returns true if the element is a row (or is in a row) that does not have data-selectable set to false.</summary>
		   return this.row(el).attr("data-selectable") !== "false";
	   },
	   
	   disableSelection: function () {
		   /// <summary>Disables text selection on the list.</summary>
		   this.element.attr('unselectable', 'on')
			   .css({
				   '-moz-user-select': 'none',
				   '-webkit-user-select': 'none',
				   'user-select': 'none'
			   });
		   this.element[0].onselectstart = function () { return false; };
	   },

	   enableSelection: function () {
		   /// <summary>Enables text selection on the list.</summary>
		   this.element.attr('unselectable', null)
			   .css({
				   '-moz-user-select': 'text',
				   '-webkit-user-select': 'text',
				   'user-select': 'text'
			   });
		   this.element[0].onselectstart = null;
	   },

	   _clickRadio: function (event, radio) {
		   var list = this.element;

		   checkOne(list.find("input"), radio);
		   removeSelectedValues.call(this);
		   this.row(radio).addClass("selected");
		   updateValues.call(this, radio, true);
		   this._fireChange();
	   },
	   
	   _clickCheckbox: function (event, checkbox) {
		   var list = this.element,
			   row = this.row(checkbox),
			   lastCheckbox;

		   // targetListItem is the row
		   if (!event.ctrlKey && !event.shiftKey) {

			   removeSelectedValues.call(this);
			   checkOne(list.find("input"), checkbox);
			   row.addClass("selected");
			   updateValues.call(this, checkbox, true);
			   list.data("selectlist.lastcheckbox", checkbox);
			   this._fireChange();
			   
		   } else if (event.ctrlKey) {

			   this._selectSingle(checkbox, !checkbox.prop("checked"));

		   } else if (event.shiftKey) {

			   lastCheckbox = list.data("selectlist.lastcheckbox");
			   if (lastCheckbox) {
				   this._selectRange(row, this.row(lastCheckbox));
			   } else {
				   this._selectSingle(checkbox);
			   }
		   }
	   },
	   
	   _selectSingle: function (checkbox, checked) {
		   var row = this.row(checkbox),
			   list = this.element;

		   checked = (checked === false) ? false : true;
		   check(checkbox, checked);
		   this._fireChange();
		   
		   if (checked === true) {
			   row.addClass("selected");
			   updateValues.call(this, checkbox, true);
		   } else {
			   row.removeClass("selected");
			   updateValues.call(this, checkbox, false);
		   }
		   list.data("selectlist.lastcheckbox", checkbox);
	   },
	   
	   _selectRange: function (row1, row2, checked) {
		   var len, currRow, index1, index2, input;

		   index1 = row1.index();
		   index2 = row2.index();
		   checked = (checked === false) ? false : true;

		   if (index1 < index2) {
			   currRow = row1;
		   } else {
			   currRow = row2;
		   }

		   // determine the loop length
		   len = index1 - index2;
		   len = (len < 0) ? (len * -1) + 1 : len + 1;

		   while (len--) { //ignore jslint
			   input = currRow.find("input");
			   check(input, checked);
			   if (checked) {
				   currRow.addClass("selected");
				   updateValues.call(this, input, true);
			   } else {
				   currRow.removeClass("selected");
				   updateValues.call(this, input, false);
			   }
			   currRow = currRow.next();
		   }
		   this._fireChange();
	   },

	   _fireChange: function () {
		   var self = this;

		   this._trigger("change", null, {
			   checkedValues: function () {
				   return self.values();
			   }
		   });
	   },
	   
	   destroy: function () {
		   this._checkall.unbind(".selectlist");
		   $.Widget.prototype.destroy.call(this);
	   }
   });
	
	
	// uncheckes every el in els and checkes the checkedEl
	function checkOne(els, checkedEl) {
		els.each(function (i, el) {
			check(el, el === checkedEl[0]);
		});
	}

	function check(el, checked) {
		var isChecked;
		
		el = $(el);
		isChecked = el.prop("checked");
		if (checked !== isChecked) {
			el.prop("checked", checked);
			el.trigger("change");
		}
	}

	function removeSelectedValues() {
		var selected = this.element.find(".selected"),
		    widget = this;

		$.each(selected, function (i, row) {
			row = $(row);
			row.removeClass("selected");
			updateValues.call(widget, row.find("input"), false);
		});
	}

	function updateValues(input, checked) {
		var value = input.val();

		if (checked && value !== void(0)) {
			this._values[value] = true;
		} else {
			delete this._values[value];
		}

		this._trigger("valuechange", null, {
			value: value,
			checked: checked
		});
	}
});
