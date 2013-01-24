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
			ScriptBundle = new ScriptBundle("~/Scripts/jquery.ui.interactions.min.js")
				.Include("~/Scripts/jquery.ui.draggable.js")
				.Include("~/Scripts/jquery.ui.sortable.js")
				.Include("~/Scripts/jquery.ui.droppable.js");
			Category = Categories.UI;
		}
	}
}
