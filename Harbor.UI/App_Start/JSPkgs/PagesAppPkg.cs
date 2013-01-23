using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PagesAppPkg : JavaScriptPackage
	{
		public const string PackageName = "Pages";

		public PagesAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("Pages/PagesTemplates");
		}
	}
}
