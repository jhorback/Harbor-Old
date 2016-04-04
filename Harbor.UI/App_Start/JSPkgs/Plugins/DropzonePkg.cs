using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class DropzonePkg : JavaScriptPackage
	{
        public const string PackageName = "Dropzone";

        public DropzonePkg()
        {
            Name = PackageName;
            ScriptBundle = new ScriptBundle("~/scripts/src/dropzone.min.js")
                .Include("~/scripts/lib/dropzone/downloads/dropzone.min.js")
                .Include("~/scripts/modules/dropzone/$dropzone.js");
            StyleBundle = new StyleBundle("~/scripts/lib/dropzone/downloads/css/dropzone.min.css")
                .Include("~/scripts/lib/dropzone/downloads/css/dropzone.css");
            Category = Categories.UI;
        }
    }
}