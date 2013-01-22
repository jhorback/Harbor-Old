// Create the Application View and Model in zeta for bundling

// create the application view with all view extensions
Application.View = Backbone.View.extend({ });
ModelBinder.extend(Application.View.prototype);
JstViewExtension.extend(Application.View.prototype);
FormErrorHandler.extend(Application.View.prototype);

// create the application model with all model extensions
Application.Model = Backbone.Model.extend({ });
BackupModelExtension.extend(Application.Model.prototype);
GetSetModelExtension.extend(Application.Model.prototype);
ValidationModelExtension.extend(Application.Model.prototype);


JSPM.pkgSrc = Application.url("home/jspm");