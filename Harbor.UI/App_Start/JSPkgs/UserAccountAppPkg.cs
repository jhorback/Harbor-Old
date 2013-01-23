using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserAccountAppPkg : JavaScriptPackage
	{
		public const string PackageName = "UserAccount";

		public UserAccountAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("User/UserAccountTemplates");
			Dependencies = new[] { UserModelPkg.PackageName };
		}
	}
}
