using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class JQueryPkg : JavaScriptPackage
	{
		public const string PackageName = "jQuery";
		
		public JQueryPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/jquery.min.js")
				.Include("~/Scripts/jquery-1.*");
		}
	}
}
