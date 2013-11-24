using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class AppUIPkg : JavaScriptPackage
	{
		public const string PackageName = "AppUI";

		public AppUIPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/appui.min.js")
				.IncludeDirectory("~/Scripts/modules/bbextui", "*.js", searchSubdirectories: true);
			StyleBundle = new StyleBundle("~/Content/site/ext/appui.min.css")
				.Include("~/Content/site/ext/pager.css");
			Category = Categories.UI;
		}
	}
}
