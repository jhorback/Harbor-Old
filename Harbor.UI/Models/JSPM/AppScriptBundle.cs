using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class AppScriptBundle : ScriptBundle
	{
		public AppScriptBundle(string appName)
			: base("~/Scripts/apps/" + appName + ".min.js")
		{
			Include("~/Scripts/apps/" + appName + "/" + appName + ".js");
			IncludeDirectory("~/Scripts/apps/" + appName, "*.js", searchSubdirectories: true);
		}
	}
}