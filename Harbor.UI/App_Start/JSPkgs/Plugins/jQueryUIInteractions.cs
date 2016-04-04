using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class JQueryUIInteractionsPkg : JavaScriptPackage
	{
		public const string PackageName = "JQueryUIInteractions";

        public JQueryUIInteractionsPkg()
        {
            Name = PackageName;
            ScriptBundle = new ScriptBundle("~/scripts/src/jquery.ui.interactions.min.js")
                .Include("~/scripts/lib/jquery-ui/ui/draggable.js")
                .Include("~/scripts/lib/jquery-ui/ui/sortable.js")
                .Include("~/scripts/lib/jquery-ui/ui/droppable.js");
                //.Include("~/scripts/lib/jquery-ui/ui/resizable.js")
                //.Include("~/scripts/lib/jquery-ui/ui/selectable.js");
            StyleBundle = new StyleBundle("~/css/src/jquery.ui.interactions.css")
                .Include("~/content/themes/base/resizable.css");
            AddDependency(JQueryUICorePkg.PackageName);
            Category = Categories.UI;
        }
    }
}
