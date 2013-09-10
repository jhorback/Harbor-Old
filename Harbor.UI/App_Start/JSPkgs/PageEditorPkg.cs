using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageEditorPkg : JavaScriptPackage
	{
		public const string PackageName = "pageEditor";

		public PageEditorPkg()
		{
			Name = PackageName;
			ScriptBundle = new ModuleScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageEditor/PageEditorTemplates");
			Category = Categories.Apps;

			AddDependency(CurrentPageModelPkg.PackageName);
			AddDependency(RedactorPkg.PackageName);
			AddDependency(FileSelectorPkg.PackageName);
		}
	}
}
