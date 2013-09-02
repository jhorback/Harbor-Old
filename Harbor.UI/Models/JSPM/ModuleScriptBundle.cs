using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class ModuleScriptBundle : ScriptBundle
	{
		public ModuleScriptBundle(string moduleName)
			: base("~/Scripts/modules/" + moduleName + ".min.js")
		{
			IncludeDirectory("~/Scripts/modules/" + moduleName, "*.js", searchSubdirectories: true);
		}
	}
}