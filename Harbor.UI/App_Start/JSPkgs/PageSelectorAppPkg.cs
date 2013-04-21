using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageSelectorAppPkg : JavaScriptPackage
	{
		public const string PackageName = "PageSelector";

		public PageSelectorAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageSelector/PageSelectorTemplates");
			Category = Categories.Apps;

			AddDependency<PageModelPkg>();
		}
	}
}
