using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SettingsPkg : JavaScriptPackage
	{
		public const string PackageName = "Settings";
		
		public SettingsPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new [] { "User/SettingsTemplates" };
		}
	}
}
