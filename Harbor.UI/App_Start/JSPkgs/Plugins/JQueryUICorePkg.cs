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
            ScriptBundle = new ScriptBundle("~/scripts/src/jquery.ui.min.js")
                .Include("~/scripts/lib/jquery-ui/ui/core.js")
                .Include("~/scripts/lib/jquery-ui/ui/widget.js")
                .Include("~/scripts/lib/jquery-ui/ui/mouse.js")
                .Include("~/scripts/lib/jquery-ui/ui/position.js");
            Category = Categories.UI;
        }
    }
}
