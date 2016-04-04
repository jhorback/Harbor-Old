using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageSelectorPkg : JavaScriptPackage
	{
		public const string PackageName = "pageSelector";

		public PageSelectorPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageSelector/Index");
			Category = Categories.Modules;

			AddDependency<PageModelPkg>();
			AddDependency(AppUIPkg.PackageName);		
		}
	}
}
