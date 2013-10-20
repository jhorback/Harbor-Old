using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageAdderPkg : JavaScriptPackage
	{
		public const string PackageName = "pageAdder";

		public PageAdderPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageAdder/index");
			Category = Categories.Modules;

			AddDependency(PageModelPkg.PackageName);
			AddDependency(CurrentUserModelPkg.PackageName);
		}
	}
}
