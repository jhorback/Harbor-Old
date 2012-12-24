using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static bool IsJst(this HtmlHelper helper)
		{
			return helper.ViewContext.RouteData.Values["jst"] as bool? ?? false;
		}
	}
}