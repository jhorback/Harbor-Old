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
			ScriptBundle = new ScriptBundle("~/Scripts/Apps/pageModel.min.js")
				.Include("~/Scripts/Apps/shared/pageModel.js");
			Category = Categories.Domain;
			AddDependency(FileModelPkg.PackageName);
		}
	}
}