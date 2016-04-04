using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class CurrentUserModelPkg : JavaScriptPackage
	{
		public const string PackageName = "currentUserModel";

		public CurrentUserModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Category = Categories.Domain;
		}
	}
}