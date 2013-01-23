using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageModelsPkg : JavaScriptPackage
	{
		public const string PackageName = "PageModels";

		public PageModelsPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/Apps/PageModels.min.js")
				.Include("~/Scripts/Apps/shared/PageModels.js");
		}
	}
}