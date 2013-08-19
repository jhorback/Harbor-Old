using System.Collections.Generic;
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
				.Include("~/Scripts/contextjs/context.js")
				.Include("~/Scripts/contextjs/app.js")
				.Include("~/Scripts/Apps/appShim.js")
				.Include("~/Scripts/appui/appui.js")
				.IncludeDirectory("~/Scripts/appui", "*.js", searchSubdirectories: true)
				.Include("~/Scripts/bbext/bbext.js")
				.IncludeDirectory("~/Scripts/bbext", "*.js", searchSubdirectories: true)
				.Include("~/Scripts/apps/AjaxRequestDefaultHandler.js");
			appBundle.Orderer = new AppBundleOrderer();
			return appBundle;
		}


		class AppBundleOrderer : IBundleOrderer
		{
			public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
			{
				var fileList = files.ToList();
				moveToEnd(fileList, "model.js");
				moveToEnd(fileList, "view.js");
				moveToEnd(fileList, "Application.js");
				return fileList;
			}

			void moveToEnd(List<FileInfo> fileList, string scriptName)
			{
				var script = fileList.SingleOrDefault(f => f.Name == scriptName);
				fileList.Remove(script);
				fileList.Add(script);
			}
		}
	}
}
