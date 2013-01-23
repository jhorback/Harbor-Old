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
		}

		Bundle getAppBundle()
		{
			var appBundle = new ScriptBundle("~/Scripts/app.js")
				.Include("~/Scripts/underscore.js")
				.Include("~/Scripts/backbone.js")
				.IncludeDirectory("~/Scripts/Apps/Application", "*.js", searchSubdirectories: true);
			appBundle.Orderer = new AppBundleOrderer();
			return appBundle;
		}


		class AppBundleOrderer : IBundleOrderer
		{
			// moves zeta.js to the end of the bundle
			public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
			{
				var fileList = files.ToList();
				var zetaJs = fileList.SingleOrDefault(f => f.Name == "zeta.js");
				fileList.Remove(zetaJs);
				fileList.Add(zetaJs);
				return fileList;
			}
		}
	}
}
