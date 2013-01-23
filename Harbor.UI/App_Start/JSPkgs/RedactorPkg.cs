using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class RedactorPkg : JavaScriptPackage
	{
		public const string PackageName = "Redactor";

		public RedactorPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/redactor.min.js")
				.Include("~/Scripts/redactor/redactor.js");
			StyleBundle = new StyleBundle("~/Content/redactor.min.css")
				.Include("~/Content/redactor/redactor.css");
		}
	}
}
