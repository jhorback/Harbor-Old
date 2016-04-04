using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SettingsAppPkg : JavaScriptPackage
	{
		public const string PackageName = "Settings";
		
		public SettingsAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("User/SettingsTemplates");
			Category = Categories.Apps;

			AddDependency(PageSelectorPkg.PackageName);
		}
	}
}
