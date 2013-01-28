using System;
using System.Text;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Optimization;

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

			var sb = new StringBuilder();

			if (sPackage.Dependencies != null)
			{
				foreach (var d in sPackage.Dependencies)
				{
					sb.Append(InstallJavaScriptPackage(helper, d));
				}
			}

			if (sPackage.StyleBundle != null)
			{
				sb.Append(Styles.Render(sPackage.StyleBundle.Path));
			}

			if (sPackage.Templates != null)
			{
				var tAction = sPackage.Templates;
				var templates = helper.Action(tAction.Action, tAction.Controller, tAction.RouteValues);
				sb.Append(templates);
			}

			if (sPackage.ScriptBundle != null)
			{
				sb.Append(Scripts.Render(sPackage.ScriptBundle.Path));
			}

			if (sPackage.RequiresRegistration)
			{
				sb.Append(string.Format("<script>JSPM.register(\"{0}\");</script>\r\n", packageName));
			}

			return new MvcHtmlString(sb.ToString());
		}
	}
}