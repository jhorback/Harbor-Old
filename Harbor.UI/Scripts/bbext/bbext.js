/*
 * bbext.js
 *
 * Description:
 *     Application.View and Application.Model contain all of the
 *     bbext Backbone extensions.
 *     
 *     Also contains the registrations for the bbext appjs module.
 *
 * Constructs:
 *     view - Use this contruct when using appjs to get a Backbone view with the
 *            bbext view extensions.
 *
 */

// create the application view with all view extensions
Application.View = Backbone.View.extend({});
ModelBinder.extend(Application.View.prototype);
JstViewExtension.extend(Application.View.prototype);
CloseViewExtension.extend(Application.View.prototype);
FormErrorHandler.extend(Application.View.prototype);


// create the application model with all model extensions
Application.Model = Backbone.Model.extend({});
BackupModelExtension.extend(Application.Model.prototype);
GetSetModelExtension.extend(Application.Model.prototype);
ValidationModelExtension.extend(Application.Model.prototype);



// jch! - figure the best way to inject this
/*
Module: harborConfig?
baseUrl wold be an injected property
baseUrl could be a service?
*/
JSPM.pkgSrc = Application.url("home/jspm");



var bbext = module("bbext");

bbext.construct("view", function (context) {
	return function (construct) {
		var View, protoProps;
		protoProps = construct.prototype;

		protoProps.constructor = construct;
		if (protoProps.constructor) {
			protoProps._ctor = protoProps.constructor;
		}

		protoProps.constructor = function () {

			// inject the constructor
			if (this._ctor) {
				context.call(this._ctor, arguments, this);
			}

			Backbone.View.apply(this, arguments);
			return this;
		};

		View = Application.View.extend(protoProps, construct);
		return View;
	};
});


bbext.construct("model", function (context) {
	return function (construct) {
		var Model, protoProps;
		protoProps = construct.prototype;

		protoProps.constructor = construct;
		if (protoProps.constructor) {
			protoProps._ctor = protoProps.constructor;
		}

		protoProps.constructor = function () {

			// inject the constructor
			if (this._ctor) {
				context.call(this._ctor, arguments, this);
			}

			Backbone.Model.apply(this, arguments);
			return this;
		};

		Model = Application.View.extend(protoProps, construct);
		return Model;
	};
});
