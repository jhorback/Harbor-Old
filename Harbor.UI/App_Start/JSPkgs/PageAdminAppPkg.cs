using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageAdminAppPkg : JavaScriptPackage
	{
		public const string PackageName = "pageAdmin";

		public PageAdminAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageAdmin/Index");
			Category = Categories.Apps;
		}
	}
}
