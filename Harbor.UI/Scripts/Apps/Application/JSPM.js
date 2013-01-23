/*global window, jQuery, _ */
/*
 * Client methods:
 *     JSPM.pkgSrc = "/packagemanager/path";
 *     JSPM.instal("PackageName"); // can be an array
 *     JSPM.register("ServerLoadedPackage");
 * 
 * Server configuration:
 *     Need to set JSPM.pkgSrc and have it return the JavaScript package manafest in json.
 *
 *     Request "~/jspm/PackageName
 *     Response // all arrays can also be a string if only one
 *     {
 *         name: "PackageName",
 *         scripts: [],
 *         styles: [],
 *         templates: [], // the templates are appended to the body
 *         dependencies: []
 *     }
 *
 */
(function (root, $, _) {
	"use strict";

	var _jspm, JSPM;
	
	JSPM = {
		
		pkgSrc: null,
		
		install: function (pkgs, success, proxy) {
			/// <summary>
			///     pkgs - A package name or array of package names to install.
			///     success - a callback called when the package has been installed.
			///     proxy - sets the context ('this') in the success callback.
			/// Returns a promise which is resolved when the package has been installed.
			/// </summary>
			var dfds = [];
			
			pkgs = _jspm.asArray(pkgs);
				
			_.each(pkgs, function (pkg) {
				var promise = _jspm.cache[pkg];
				if (!promise) {
					dfds.push(_jspm.promisePackage(pkg));
				}
				dfds.push(promise);
			});
			
			success = success || function () { };
			proxy = proxy || this;
			return $.when.apply($, dfds).then(_.bind(success, proxy));
		},
		
		register: function (packageName) {
			/// <summary>Add the package to the cache and registration table.</summary>
			_jspm.cache[packageName] = _jspm.resolved();
			JSPM.registered.unshift(packageName);
		},
		
		registered: []
	};
	
	_jspm = {
		
		cache: {},
		
		asArray: function (obj) {
			/// <summary>
			/// If not an array, will make the object
			/// the only item in a new array.
			/// </summary>
			return _.isArray(obj) ? obj : [obj];
		},
		
		resolved: function () {
			return $.Deferred().resolve().promise();
		},
		
		url: function (pkg) {
			return JSPM.pkgSrc + "?name=" + pkg;
		},
		
		promisePackage: function (pkg) {
			var promisePackage = $.Deferred(),
				getPackageManifest = $.get(_jspm.url(pkg)),
				installDependencies = JSPM.install(pkg.dependencies || []);
			
			$.when(getPackageManifest, installDependencies)
				.then(function (getPackageManifestArgs) {
					var promises, packageManifest = getPackageManifestArgs[0];
					promises = [
						_jspm.promiseScripts(packageManifest.scripts),
						_jspm.promiseStyles(packageManifest.styles),
						_jspm.promiseTemplates(packageManifest.templates)
					];
					$.when.apply($, promises).then(promisePackage.resolve);
				});

			return promisePackage.promise();
		},
		
		promiseScripts: function (scripts) {
			var dfd = $.Deferred(),
				toLoad = [];
			
			if (!scripts || scripts.length === 0) {
				return _jspm.resolved();
			}
			
			scripts = _jspm.asArray(scripts);
			_.each(scripts, function (script) {
				toLoad.push($.getScript(script));
			});
			$.when.apply($, toLoad).then(dfd.resolve);
			return dfd.promise();
		},
		
		promiseStyles: function (styles) {
			_.each(styles, function (style) {
				 $("head").append($('<link/>').attr({
					rel: "stylesheet",
					type: "text/css",
					href: style
				}));
			});
			return _jspm.resolved();
		},
		
		promiseTemplates: function (templates) {
			var dfd = $.Deferred(),
			    toLoad = [];

			if (!templates || templates.length === 0) {
				return _jspm.resolved();
			}
			
			templates = _jspm.asArray(templates);
			_.each(templates, function (template) {
				var getTemplate = $.ajax({ url: template, dataType: "html" })
					.then(function (response) {
						 $(root.document.body).append(response);
					});
				toLoad.push(getTemplate);
			});
			$.when.apply($, toLoad).then(dfd.resolve);
			return dfd.promise();
		}
	};

	root.JSPM = JSPM;

}(window, jQuery, _));