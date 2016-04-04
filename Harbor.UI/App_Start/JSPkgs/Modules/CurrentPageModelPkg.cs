using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class CurrentPageModelPkg : JavaScriptPackage
	{
		public const string PackageName = "currentPageModel";

		public CurrentPageModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Category = Categories.Domain;
			AddDependency(PageModelPkg.PackageName);
		}
	}
}