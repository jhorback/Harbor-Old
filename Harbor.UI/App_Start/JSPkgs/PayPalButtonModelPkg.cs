using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PayPalButtonModelPkg : JavaScriptPackage
	{
		public const string PackageName = "payPalButtonModel";

		public PayPalButtonModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Category = Categories.Modules;
		}
	}
}
