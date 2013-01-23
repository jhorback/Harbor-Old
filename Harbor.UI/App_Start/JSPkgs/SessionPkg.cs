using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SessionPkg : JavaScriptPackage
	{
		public const string PackageName = "Session";

		public SessionPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new[] { "User/SessionTemplates" };
		}
	}
}
