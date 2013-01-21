using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackage : IJavaScriptPackage
	{
		public string Name { get; protected set; }
		public Bundle ScriptBundle { get; protected set; }
		public string[] Templates { get; protected set; }
		public Bundle StyleBundle { get; protected set; }
		public string[] Dependencies { get; protected set; }
	}
}