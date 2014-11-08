using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class FileSelectorPkg : JavaScriptPackage
	{
		public const string PackageName = "fileSelector";

		public FileSelectorPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Templates = new JstTemplateAction("FileSelector/Index");
			Category = Categories.Apps;

			AddDependency(FileModelPkg.PackageName);
			AddDependency(AppUIPkg.PackageName);
			AddDependency(Html5UploaderPkg.PackageName);
		}
	}
}
