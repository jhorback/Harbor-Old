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
				.Include("~/Content/site/core/layout.css")
				.Include("~/Content/site/core/material.css")
				.Include("~/Content/site/core/content.css");
			RequiresRegistration = false;
			Category = Categories.UI;
		}
	}
}