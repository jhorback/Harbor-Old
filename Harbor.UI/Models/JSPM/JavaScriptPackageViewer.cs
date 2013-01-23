using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackageViewer
	{		
		IJavaScriptPackage package;

		public JavaScriptPackageViewer(IJavaScriptPackage package)
		{
			this.package = package;
		}

		public string[] GetScripts()
		{
			if (package.ScriptBundle != null)
			{
				var scriptString = Scripts.Render(package.ScriptBundle.Path).ToString();
				var parts = Regex.Split(scriptString, "<script src=\"");
				return parts.Select(part => part.Replace("\"></script>\r\n", "")).Where(script => string.IsNullOrEmpty(script) == false).ToArray();
			}
			return null;
		}

		public string[] GetStyles()
		{
			if (package.StyleBundle != null)
			{
				var styleString = Styles.Render(package.StyleBundle.Path).ToString();
				var parts = Regex.Split(styleString, "<link href=\"");
				return parts.Select(part => part.Replace("\" rel=\"stylesheet\"/>\r\n", "")).Where(script => string.IsNullOrEmpty(script) == false).ToArray();
			}
			return null;
		}
		
		public string[] GetTemplates()
		{
			if (package.Templates != null)
				return package.Templates.Select(t => VirtualPathUtility.ToAbsolute(string.Format("~/JST/{0}", t))).ToArray();
			return null;
		}

		public string[] GetDependencies()
		{
			return package.Dependencies;
		}
	}
}