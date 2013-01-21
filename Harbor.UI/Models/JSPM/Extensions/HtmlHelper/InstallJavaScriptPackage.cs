using System.Text;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Harbor.UI.Models.JSPM.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static MvcHtmlString InstallJavaScriptPackage(this HtmlHelper helper, string packageName)
		{
			var package = JavaScriptPackageDto.FromIJavaScriptPackage(PackageTable.Packages.GetPackage(packageName));
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

			if (package.templates != null)
			{
				foreach (var t in package.templates)
				{
					sb.Append(helper.Partial(t));
				}
			}


			if (package.scripts != null)
			{
				foreach (var s in package.scripts)
				{
					sb.Append(string.Format("<script src=\"{0}\"></script>\r\n", s));
				}
			}

			return new MvcHtmlString(sb.ToString());
		}
	}
}