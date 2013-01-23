using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class FileAdminAppPkg : JavaScriptPackage
	{
		public const string PackageName = "FileAdmin";

		public FileAdminAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("FileAdmin/FileAdminTemplates");

			AddDependency(FileModelPkg.PackageName);
			AddDependency(Html5UploaderPkg.PackageName);
		}
	}
}
