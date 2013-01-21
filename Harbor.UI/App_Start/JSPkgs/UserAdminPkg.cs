using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserAdminPkg : JavaScriptPackage
	{
		public const string PackageName = "UserAdmin";

		public UserAdminPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new[] { "UserAdmin/UserAdminTemplates" };
			Dependencies = new[] { UserModelPkg.PackageName };
		}
	}
}
