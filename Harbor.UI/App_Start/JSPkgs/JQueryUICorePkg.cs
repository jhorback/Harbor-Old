using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class JQueryUICorePkg : JavaScriptPackage
	{
		public const string PackageName = "jQueryUICore";
		
		public JQueryUICorePkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/jquery.ui.min.js")
				.Include("~/Scripts/jquery.ui.core.js")
				.Include("~/Scripts/jquery.ui.widget.js")
				.Include("~/Scripts/jquery.ui.mouse.js")
				.Include("~/Scripts/jquery.ui.position.js");
			RequiresRegistration = false;
		}
	}
}
