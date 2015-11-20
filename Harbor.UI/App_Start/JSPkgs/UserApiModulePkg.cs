using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserApiModulePkg : JavaScriptPackage
	{
		public const string PackageName = "UserApi";

		public UserApiModulePkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Category = Categories.Domain;
		}
	}
}