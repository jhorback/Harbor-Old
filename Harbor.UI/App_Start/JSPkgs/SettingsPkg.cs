using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SettingsPkg : IJavaScriptPackage
	{
		public const string PackageName = "Settings";
		
		public SettingsPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			StyleBundle = new StyleBundle("~/Content/site/core/site.min.css")
				.Include("~/Content/site/core/foundation.css")
				.IncludeDirectory("~/Content/site/core", "*.css");
			Templates = new [] { "User/SettingsTemplates" };
		}

		public string Name { get; private set; }
		public Bundle ScriptBundle { get; private set; }
		public string[] Templates { get; private set; }
		public Bundle StyleBundle { get; private set; }
		public string[] Dependencies { get; private set; }
	}
}
