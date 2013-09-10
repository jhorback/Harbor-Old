using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class FileModelPkg : JavaScriptPackage
	{
		public const string PackageName = "fileModel";

		public FileModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Category = Categories.Domain;
		}
	}
}