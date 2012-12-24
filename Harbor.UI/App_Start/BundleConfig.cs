using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Optimization;
using System.Linq;

namespace Harbor.UI
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/Scripts/jquery.js")
				.Include("~/Scripts/jquery-1.*")
			);

			bundles.Add(new ScriptBundle("~/Scripts/jquery.ui.js")
				.Include("~/Scripts/jquery.ui.core.js")
				.Include("~/Scripts/jquery.ui.widget.js")
				.Include("~/Scripts/jquery.ui.mouse.js")
				.Include("~/Scripts/jquery.ui.position.js")
			);

			var appBundle = new ScriptBundle("~/Scripts/app.js")
				.Include("~/Scripts/underscore.js")
				.Include("~/Scripts/backbone.js")
				.IncludeDirectory("~/Scripts/Apps/Application", "*.js", searchSubdirectories: true);
			appBundle.Orderer = new AppBundleOrderer();
			bundles.Add(appBundle);

			bundles.Add(new ScriptBundle("~/Scripts/PageModels.js")
				.Include("~/Scripts/Apps/shared/PageModels.js")
			);

			bundles.Add(createAppBundle("Session"));
			bundles.Add(createAppBundle("UserAccount", dependents: new[] {"~/Scripts/Apps/shared/UserModel.js"}));
			bundles.Add(createAppBundle("Settings"));
			bundles.Add(createAppBundle("UserAdmin", dependents: new[] {"~/Scripts/Apps/shared/UserModel.js"}));
			bundles.Add(createAppBundle("Pages"));
			bundles.Add(createAppBundle("PageAdder"));
			bundles.Add(createAppBundle("PageEditor"));
			bundles.Add(createAppBundle("PageLoader"));
			bundles.Add(createAppBundle("FileAdmin", dependents: new[] { "~/Scripts/Apps/shared/FileModel.js", "~/Scripts/jquery.html5uploader.js" }));
			// bundles.Add(createAppBundle("FileUploader", dependents: new[] { "~/Scripts/Apps/shared/FileModel.js", "~/Scripts/jquery.html5uploader.js" }));


			// style bundles
			bundles.Add(new StyleBundle("~/Content/site.min.css")
				.Include("~/Content/site/core/foundation.css")
				.IncludeDirectory("~/Content/site/core", "*.css"));
			bundles.Add(new StyleBundle("~/Content/theme.min.css")
				.Include("~/Content/themes/default/theme.css"));
		}

		private static Bundle createAppBundle(string appName, string[] dependents = null)
		{
			var bundle = new ScriptBundle("~/Scripts/Apps/" + appName + ".js");
			if (dependents != null)
			{
				foreach (var d in dependents)
					bundle.Include(d);
			}

			bundle.Include("~/Scripts/Apps/" + appName + "/" + appName + ".js")
				.IncludeDirectory("~/Scripts/Apps/" + appName, "*.js", searchSubdirectories: true);
			return bundle;
		}

		class AppBundleOrderer : IBundleOrderer
		{
			// moves zeta.js to the end of the bundle
			public IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
			{
				var fileList = files.ToList();
				var zetaJs = files.SingleOrDefault(f => f.Name == "zeta.js");
				fileList.Remove(zetaJs);
				fileList.Add(zetaJs);
				return fileList;
			}
		}
	}
}