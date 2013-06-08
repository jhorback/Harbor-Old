﻿using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class ApplicationPkg : JavaScriptPackage
	{
		public const string PackageName = "Application";

		public ApplicationPkg()
		{
			Name = PackageName;
			ScriptBundle = getAppBundle();
			RequiresRegistration = false;
			Category = Categories.MVFramework;
		}

		Bundle getAppBundle()
		{
			var appBundle = new ScriptBundle("~/Scripts/app.js")
				.Include("~/Scripts/underscore.js")
				.Include("~/Scripts/backbone.js")
				.Include("~/Scripts/app/context.js")
				.IncludeDirectory("~/Scripts/app", "*.js", searchSubdirectories: true)
				.IncludeDirectory("~/Scripts/bbext", "*.js", searchSubdirectories: true)
				.IncludeDirectory("~/Scripts/app/appui", "*.js", searchSubdirectories: true)
				.Include("~/Scripts/Apps/AjaxRequestDefaultHandler.js");
			appBundle.Orderer = new AppBundleOrderer();
			return appBundle;
		}


		class AppBundleOrderer : IBundleOrderer
		{
			public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
			{
				var fileList = files.ToList();
				var lastScript = fileList.SingleOrDefault(f => f.Name == "bbext.js");
				fileList.Remove(lastScript);
				fileList.Add(lastScript);
				return fileList;
			}
		}
	}
}
