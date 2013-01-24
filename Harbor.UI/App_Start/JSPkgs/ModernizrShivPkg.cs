using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class ModernizrShivPkg : JavaScriptPackage
	{
		public const string PackageName = "ModernizrShiv";
		
		public ModernizrShivPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/modernizrshiv.min.js")
				.Include("~/Scripts/modernizr-2.6.2-custom.js");
			RequiresRegistration = false;
			Category = Categories.DomAbstraction;
		}
	}
}
