using System;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Harbor.UI.Models.JSPM.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static MvcHtmlString InstallJavaScriptPackage<T>(this HtmlHelper helper) where T : IJavaScriptPackage
		{
			var instance = (IJavaScriptPackage)Activator.CreateInstance(typeof(T));
			return InstallJavaScriptPackage(helper, instance.Name);
		}

		public static MvcHtmlString InstallJavaScriptPackage(this HtmlHelper helper, string packageName)
		{
			var sPackage = PackageTable.Packages.GetPackage(packageName);
			if (sPackage == null) 
				throw new Exception("The package to install could not be found: " + packageName);

			var package = JavaScriptPackageDto.FromIJavaScriptPackage(sPackage);
			var sb = new StringBuilder();

			if (package.dependencies != null)
			{
				foreach (var d in package.dependencies)
				{
					sb.Append(InstallJavaScriptPackage(helper, d));
				}
			}

			if (package.styles != null)
			{
				foreach (var s in package.styles)
				{
					sb.Append(string.Format("<link href=\"{0}\" rel=\"stylesheet\"/>\r\n", s));
				}
			}

			if (sPackage.Templates != null)
			{
				var tAction = sPackage.Templates;
				var templates = helper.Action(tAction.Action, tAction.Controller, tAction.RouteValues);
				sb.Append(templates);
			}


			if (package.scripts != null)
			{
				foreach (var s in package.scripts)
				{
					sb.Append(string.Format("<script src=\"{0}\"></script>\r\n", s));
				}
			}

			if (sPackage.RequiresRegistration)
			{
				sb.Append(string.Format("<script>JSPM.register(\"{0}\");</script>\r\n", packageName));
			}

			return new MvcHtmlString(sb.ToString());
		}
	}
}