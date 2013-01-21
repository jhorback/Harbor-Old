using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackageViewer
	{
		public static string JSPMParserPartialPath = "~/Views/Home/_JSPMParser.cshtml";
		Controller currentController;
		IJavaScriptPackage package = null;
		string[] scripts = null;
		string[] styles = null;

		public JavaScriptPackageViewer(IJavaScriptPackage package, Controller currentController)
		{
			this.currentController = currentController;
			this.package = package;
			determineScriptsAndStyles();
		}

		public string[] GetScripts()
		{
			return scripts;
		}


		public string[] GetStyles()
		{
			return styles;
		}

		public static string[] ExtractScripts(string source)
		{
			var typeParts = Regex.Split(source, "<div></div>\r\n");
			var parts = Regex.Split(typeParts[0], "<script src=\"");
			return parts.Select(part => part.Replace("\"></script>\r\n", "")).Where(script => string.IsNullOrEmpty(script) == false).ToArray();
		}

		public static string[] ExtractStyles(string source)
		{
			var typeParts = Regex.Split(source, "<div></div>\r\n");
			var parts = Regex.Split(typeParts[1], "<link href=\"");
			return parts.Select(part => part.Replace("\" rel=\"stylesheet\"/>\r\n", "")).Where(script => string.IsNullOrEmpty(script) == false).ToArray();
		}


		private void determineScriptsAndStyles()
		{
			var helper = getHtmlHelper();
			var result = helper.Partial(JavaScriptPackageViewer.JSPMParserPartialPath, package).ToString();
			this.scripts = ExtractScripts(result);
			this.styles = ExtractStyles(result);
		}

		
		public string[] GetTemplates()
		{
			var url = getUrlHelper();
			var list = new List<string>();
			foreach (var t in package.Templates)
			{
				var virtualPath = string.Format("~/Views/{0}", t);
				var absolutePath = url.Content(virtualPath);
				list.Add(absolutePath);
			}
			return list.ToArray();
		}

		public string[] GetDependencies()
		{
			return package.Dependencies;
		}

		private UrlHelper getUrlHelper()
		{
			var currentRoute = RouteTable.Routes.GetRouteData(currentController.HttpContext);
			return new UrlHelper(new RequestContext(currentController.HttpContext, currentRoute));
		}

		private HtmlHelper getHtmlHelper()
		{
			System.IO.TextWriter writer = new System.IO.StringWriter();

			var wfv = new WebFormView(currentController.ControllerContext, JavaScriptPackageViewer.JSPMParserPartialPath);
			var h = new HtmlHelper(new ViewContext(currentController.ControllerContext, wfv, new ViewDataDictionary(), new TempDataDictionary(), writer), new ViewPage());

			return h;
		}

		private class viewDataContainer : IViewDataContainer
		{
			internal viewDataContainer()
			{
				ViewData = new ViewDataDictionary();	
			}
			public ViewDataDictionary ViewData { get; set; }
		}
	}
}