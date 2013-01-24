using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class FileSelectorAppPkg : JavaScriptPackage
	{
		public const string PackageName = "FileSelector";

		public FileSelectorAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("FileSelector/FileSelectorTemplates");
			Category = Categories.Apps;

			AddDependency(FileModelPkg.PackageName);
		}
	}
}
