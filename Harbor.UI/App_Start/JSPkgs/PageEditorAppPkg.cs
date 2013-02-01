using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class PageEditorAppPkg : JavaScriptPackage
	{
		public const string PackageName = "PageEditor";

		public PageEditorAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("PageEditor/PageEditorTemplates");
			Category = Categories.Apps;

			AddDependency(RedactorPkg.PackageName);
			AddDependency(FileSelectorAppPkg.PackageName);
		}
	}
}
