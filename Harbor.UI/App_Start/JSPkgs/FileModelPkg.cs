using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class FileModelPkg : JavaScriptPackage
	{
		public const string PackageName = "FileModel";

		public FileModelPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/Apps/FileModel.min.js")
				.Include("~/Scripts/Apps/shared/FileModel.js");
			Category = Categories.Domain;
		}
	}
}