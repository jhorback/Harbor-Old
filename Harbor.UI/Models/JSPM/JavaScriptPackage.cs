using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class AppScriptBundle : ScriptBundle
	{
		public AppScriptBundle(string appName) : base("~/Scripts/Apps/" + appName + ".js")
		{
			Include("~/Scripts/Apps/" + appName + "/" + appName + ".js");
			IncludeDirectory("~/Scripts/Apps/" + appName, "*.js", searchSubdirectories: true);
		}
	}
}