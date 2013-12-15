using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="helper"></param>
		/// <param name="pageID"></param>
		/// <param name="componentTypeKey"></param>
		/// <param name="uicid"></param>
		/// <returns></returns>
		public static HtmlString PageComponent(this HtmlHelper helper, int pageID, string componentTypeKey, string uicid)
		{
			if (string.IsNullOrEmpty(componentTypeKey)) // jch - testing
			{
				return new MvcHtmlString("NO COMPONENT TYPE");
			}
			return helper.Action(componentTypeKey, "Page", new { pageID = pageID, uicid = uicid });
		}
	}
}