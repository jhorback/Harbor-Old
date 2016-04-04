using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class Html5ShivPkg : JavaScriptPackage
	{
		public const string PackageName = "Html5Shiv";

        public Html5ShivPkg()
        {
            Name = PackageName;
            ScriptBundle = new ScriptBundle("~/scripts/src/html5shiv.min.js")
                .Include("~/scripts/lib/html5shiv/dist/html5shiv.js")
                .Include("~/scripts/lib/webcomponentsjs/webcomponents-lite.js")
                //.Include("~/scripts/lib/dom4/build/dom4.max.js")
                //.Include("~/Scripts/lib/document-register-element/build/document-register-element.max.js")
                //.Include("~/Scripts/lib/document-register-element/build/innerHTML.max.js")
                ;
            RequiresRegistration = false;
            Category = Categories.DomAbstraction;
        }
    }
}
