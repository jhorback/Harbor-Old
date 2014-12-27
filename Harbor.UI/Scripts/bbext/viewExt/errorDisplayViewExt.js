/*
 * Markup:
 *     [data-validation-for] - attribute can be set to the name of a model property that is
 *                             validated and placed where error text should be displayed.
 *     .form-field, .form-inline - if a 'data-validation-for' element is inside a .form-field (or .form-inline) an error class will be applied
 *     .alert-error - for general form errors (should be an element inside a form)
 *   
 * Usage:
 *     if (someView.isModelValid()) { // this will update the view if there are errors
 *         someModel.save();
 *     }
 *
 * The other methods (displayError, displayErrors, and clearErrors) are
 * fairly self explanitory.
 */
function errorDisplayViewExt(_, console) {

	var extension, internal;

	extension = {
		isModelValid: function (model) {
			/// <summary>
			/// Returns true if the model is valid, otherwise updates the view with the errors.
			/// Will look at the view.model property if the model is not passed.
			/// </summary>
			model = model || this.model;
			this.clearErrors(model);
			return this.displayErrors(model.getErrors(), false);
		},

		displayError: function (attr, errors, showAll) {
			/// <summary>Updates or removes the errors from the view.</summary>
			var errorAttr = errors && errors[attr],
			    errorStr;
			
			if (!errorAttr || !errorAttr.join) {
				return;
			}
			
			if (attr) {
				internal.displayFieldError.call(this, attr, errorAttr.join(", "), showAll);
			} else {
				internal.displayGeneralError.call(this, formatGeneralError(errorAttr));
			}
		},

		displayErrors: function (errors, showAll) {
			/// <summary>showAll will show errors that do not have a dom node associated in the summary section (default is true).</summary>
			var displayError = _.bind(this.displayError, this);

			if (showAll === undefined) {
				showAll = true;
			}

			if (errors) {
				_.each(_.keys(errors), function (key) {
					displayError(key, errors, showAll);
				});
				return false;
			}
			return true;
		},

		clearErrors: function (model) {
			var attrs;

			model = model || this.model;
			if (!model) {
				return;
			}

			attrs = _.reduce(model.attributes, function (memo, value, key) {
				memo[key] = [];
				return memo;
			}, {"":[]});

			this.displayErrors.call(this, attrs, false); 
		},

		clearError: function (attr) {
			internal.displayFieldError.call(this, attr, "");
		}
	};


	internal = {
		displayFieldError: function (attr, errorStr, showAll) {
			var errorSpan, formField, view = this;

			errorSpan = view.$("[data-validation-for]").filter(function () {
				return $(this).attr("data-validation-for").toLowerCase() === attr.toLowerCase();
			});

			if (errorStr && errorSpan.length === 0) {
				if (showAll) {
					internal.displayGeneralError.call(view, "An error occured with: " + attr + " - " + errorStr);
				} else {
					alert(attr + ": " + errorStr);
					console.warn("There was an error on the model that cannot be displayed: " + attr + " - " + errorStr);
				}
			}

			formField = errorSpan.closest(".form-field,.form-inline");
			if (errorStr) {
				formField.addClass("error");
				internal.addErrorHtml.call(view, errorSpan, errorStr);
			} else {
				formField.removeClass("error");
				errorSpan.html("");
			}
		},

		displayGeneralError: function (errorStr) {
			var view = this,
			    form = view.$("form"),
			    summarySpan = view.$(".alert-error");


			if (form.length === 0 || summarySpan.length === 0) {
				console.warn("A form or .alert-error element could not be found to display the error.");
			}

			if (errorStr) {
				form.addClass("error");
				internal.addErrorHtml.call(view, summarySpan, errorStr);
			} else {
				form.removeClass("error");
				summarySpan.html("").hide();
			}
		},

		addErrorHtml: function (el, error) {
			/// <summary>If the error exists, hides then shows it - otherwise just shows it.</summary>
			var innerHtml = $.trim(el.html());

			if (innerHtml === error) {
				el.fadeOut(function () {
					el.fadeIn();
				});
			} else {
				el.html(error).show();
			}
		}
	};


	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};
	
	function formatGeneralError(errors) {
		var formatted = [];
		if (errors.length === 0) {
			return "";
		}
		formatted.push("<h1>" + errors.shift() + "</h1><p>");
		formatted.push(errors.join("</p><p>"));
		return formatted.join("") + "</p>";
	}
}

bbext.service("bbext.errorDisplayViewExt", ["_", "console", bbext.errorDisplayViewExt = errorDisplayViewExt]);
