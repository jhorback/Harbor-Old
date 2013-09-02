using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SessionAppPkg : JavaScriptPackage
	{
		public const string PackageName = "Session";

		public SessionAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("User/SessionTemplates");
			RequiresRegistration = false;
			Category = Categories.Apps;
			AddDependency(CurrentUserModelPkg.PackageName);
		}
	}
}
