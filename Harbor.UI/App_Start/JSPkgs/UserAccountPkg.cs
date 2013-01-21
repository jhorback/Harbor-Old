using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserAccountPkg : JavaScriptPackage
	{
		public const string PackageName = "UserAccount";

		public UserAccountPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new[] { "User/UserAccountTemplates" };
			Dependencies = new[] { UserModelPkg.PackageName };
		}
	}
}
