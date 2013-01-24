using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageAdderAppPkg : JavaScriptPackage
	{
		public const string PackageName = "PageAdder";

		public PageAdderAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("Pages/PageAdderTemplates");
			Category = Categories.Apps;
		}
	}
}
