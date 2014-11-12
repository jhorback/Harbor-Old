using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class Html5UploaderPkg : JavaScriptPackage
	{
		public const string PackageName = "Html5Uploader";

		public Html5UploaderPkg()
		{
			Name = PackageName;
			ScriptBundle = new ScriptBundle("~/Scripts/html5uploader.min.js")
				.Include("~/scripts/dropzone/dropzone.js");
			StyleBundle = new StyleBundle("~/scripts/dropzone/css/dropzone.min.css")
				.Include("~/scripts/dropzone/css/dropzone.css");
			Category = Categories.UI;
		}
	}
}