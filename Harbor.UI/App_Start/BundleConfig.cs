using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;

namespace Harbor.UI
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			// ignore any tests in bundles
			bundles.IgnoreList.Ignore("*.test.js", OptimizationMode.Always);

			//
			bundles.Add(createAppBundle("Pages"));
			bundles.Add(createAppBundle("PageSelector"));
			bundles.Add(createAppBundle("PageAdder"));
			bundles.Add(createAppBundle("PageEditor"));
			bundles.Add(createAppBundle("PageLoader"));
			bundles.Add(createAppBundle("FileAdmin", dependents: new[] { "~/Scripts/Apps/shared/FileModel.js", "~/Scripts/jquery.html5uploader.js" }));


			// style bundles
			bundles.Add(new StyleBundle("~/Content/site/core/site.min.css")
				.Include("~/Content/site/core/foundation.css")
				.IncludeDirectory("~/Content/site/core", "*.css"));
			bundles.Add(new StyleBundle("~/Content/theme.min.css")
				.Include("~/Content/themes/default/theme.css"));
			bundles.Add(new StyleBundle("~/Content/site/ext/signinpage.min.css")
				.Include("~/Content/site/ext/signinpage.css"));
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
	}
}