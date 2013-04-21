using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageModelPkg : JavaScriptPackage
	{
		public const string PackageName = "pageModel";

		public PageModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Category = Categories.Domain;
			AddDependency(FileModelPkg.PackageName);
		}
	}
}