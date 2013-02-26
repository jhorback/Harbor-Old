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
			ScriptBundle = new ScriptBundle("~/Scripts/jquery.html5uploader.min.js")
				.Include("~/scripts/jquery.html5uploader.js")
				.Include("~/scripts/dropzone.js");
			StyleBundle = new StyleBundle("~/content/dropzone.min.css")
				.Include("~/content/dropzone.css");
			Category = Categories.UI;
		}
	}
}