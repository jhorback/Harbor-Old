using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// For Ajax requests, this method adds the script tag with the specified id and html from the partial.
		/// For other requests, just adds the partial (without the script tags).
		/// The partial viewpath is relative to the Views folder and should not 
		/// contain the .cshtml extension.
		/// </summary>
		/// <param name="helper"></param>
		/// <param name="id"></param>
		/// <param name="viewpath"></param>
		/// <returns></returns>
		public static HtmlString JstPartial(this HtmlHelper helper, string id, string viewpath)
		{
			return helper.JstPartial(id, viewpath, null);
		}

		/// <summary>
		/// For Ajax requests, this method adds the script tag with the specified id and html from the partial.
		/// For other requests, just adds the partial (without the script tags).
		/// The partial viewpath is relative to the Views folder and should not 
		/// contain the .cshtml extension.
		/// </summary>
		/// <param name="helper"></param>
		/// <param name="id"></param>
		/// <param name="viewpath"></param>
		/// <param name="model"></param>
		/// <returns></returns>
		public static HtmlString JstPartial(this HtmlHelper helper, string id, string viewpath, object model)
		{
			//var request = helper.ViewContext.HttpContext.Request;
			var path = string.Format("{0}/{1}{2}", "~/Views/", viewpath, ".cshtml");
			if (helper.IsJst())
			{
				return new HtmlString(
					string.Format(@"<script type=""text/template"" id=""{0}"">{1}</script>", id, helper.Partial(path, model))
					);
			}
			else
			{
				return new HtmlString(helper.Partial(path, model).ToString());
			}
		}
	}
}