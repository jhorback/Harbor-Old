// Create the Application View and Model in zeta for bundling


// create the application view with all view extensions
Application.View = Backbone.View.extend({ });

Application.View.extend = function (protoProps, staticProps) {
	var View;
	
	if (protoProps.constructor) {
		protoProps._ctor = protoProps.constructor;
	}
	
	protoProps.constructor = function () {
		// create the regions
		Region.createRegions(this);
		
		// inject the constructor
		if (this._ctor) {
			IOC.call(this._ctor, arguments, this);
		}
		
		Backbone.View.apply(this, arguments);
		return this;
	};

	View = Backbone.View.extend(protoProps, staticProps);
	ModelBinder.extend(View.prototype);
	JstViewExtension.extend(View.prototype);
	CloseViewExtension.extend(View.prototype);
	FormErrorHandler.extend(View.prototype);
	return View;
};



// create the application model with all model extensions
Application.Model = Backbone.Model.extend({ });
BackupModelExtension.extend(Application.Model.prototype);
GetSetModelExtension.extend(Application.Model.prototype);
ValidationModelExtension.extend(Application.Model.prototype);


JSPM.pkgSrc = Application.url("home/jspm");