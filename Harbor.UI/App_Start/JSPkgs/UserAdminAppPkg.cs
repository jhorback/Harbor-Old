using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserAdminAppPkg : JavaScriptPackage
	{
		public const string PackageName = "UserAdmin";

		public UserAdminAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("UserAdmin/UserAdminTemplates");
			Dependencies = new[] { UserModelPkg.PackageName };
		}
	}
}
