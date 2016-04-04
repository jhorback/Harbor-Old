using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageLoaderAppPkg : JavaScriptPackage
	{
		public const string PackageName = "PageLoader";

		public PageLoaderAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			StyleBundle = new StyleBundle("~/Content/site/ext/pageloader.min.css")
				.Include("~/Content/site/ext/pageloader.css");
			Templates = new JstTemplateAction("PageLoader/Index");
			Category = Categories.Apps;

			AddDependency(PageEditorPkg.PackageName);
			AddDependency(PageSettingsPkg.PackageName);
		}
	}
}
