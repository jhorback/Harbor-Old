using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class UserModelPkg : JavaScriptPackage
	{
		public const string PackageName = "UserModel";

		public UserModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/Apps/shared/UserModel.min.js")
				.Include("~/Scripts/Apps/shared/UserModel.js");
		}
	}
}