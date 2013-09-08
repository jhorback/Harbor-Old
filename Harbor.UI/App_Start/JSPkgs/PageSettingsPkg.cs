
using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageSettingsPkg : JavaScriptPackage
	{
		public const string PackageName = "pageSettings";

		public PageSettingsPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageSettings/Index");
			Category = Categories.Apps;

			AddDependency(CurrentPageModelPkg.PackageName);
			AddDependency(FileSelectorAppPkg.PackageName);
		}
	}
}
