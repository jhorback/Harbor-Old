using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SiteStylePkg : JavaScriptPackage
	{
		public const string PackageName = "SiteStyle";

		public SiteStylePkg()
		{
			Name = PackageName;
			StyleBundle = new StyleBundle("~/Content/site/core/site.min.css")
				.Include("~/Content/site/core/foundation.css")
				.IncludeDirectory("~/Content/site/core", "*.css");
		}
	}
}