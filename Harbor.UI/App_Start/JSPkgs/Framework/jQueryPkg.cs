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
            ScriptBundle = new ScriptBundle("~/scripts/src/jquery.min.js")
                .Include("~/scripts/lib/jquery/dist/jquery.js")
                .Include("~/scripts/lib/jquery-migrate/jquery-migrate.js")
                .Include("~/scripts/framework/jquery.delegates.js");
            RequiresRegistration = false;
            Category = Categories.DomAbstraction;
        }
    }
}
