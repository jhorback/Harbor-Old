using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageSettingsAppPkg : JavaScriptPackage
	{
		public const string PackageName = "PageSettings";

		public PageSettingsAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageSettings/Index");
			Category = Categories.Apps;

			AddDependency(FileSelectorAppPkg.PackageName);
		}
	}
}
