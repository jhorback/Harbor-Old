using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Harbor.UI.Models.JSPM.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// Adds the HTML found at the view path (relative to the view folder).
		/// Do not add the .cshtml extension.
		/// </summary>
		/// <param name="helper"></param>
		/// <param name="viewpath"></param>
		/// <returns></returns>
		public static MvcHtmlString InstallJavaScriptPackage(this HtmlHelper helper, string viewpath)
		{
			throw new System.NotImplementedException();
			// return helper.Action("JST", "Home", new { viewpath = viewpath, jst = true });
		}
	}
}