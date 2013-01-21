using System.Web.Mvc;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackageDto
	{
		public JavaScriptPackageDto()
		{
			scripts = new string [] {};
			styles = new string [] {};
			templates = new string [] {};
			dependencies = new string [] {};
		}

		public string name { get; set; }
		public string[] scripts { get; set; }
		public string[] styles { get; set; }
		public string[] templates { get; set; }
		public string[] dependencies { get; set; }

		public static JavaScriptPackageDto FromIJavaScriptPackage(IJavaScriptPackage package, Controller controller)
		{
			var viewer = new JavaScriptPackageViewer(package, controller);
			return new JavaScriptPackageDto
			       	{
			       		name = package.Name,
						scripts = viewer.GetScripts(),
						styles = viewer.GetStyles(),
						templates = viewer.GetTemplates(),
						dependencies = viewer.GetDependencies()
			       	};
		}
	}
}
