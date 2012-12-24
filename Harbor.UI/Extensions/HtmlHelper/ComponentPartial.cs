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
		/// <param name="key"></param>
		/// <returns></returns>
		public static HtmlString ComponentPartial(this HtmlHelper helper, PageUIC uic, Page page)
		{
			return helper.Partial("~/Views/Components/" + uic.key + ".cshtml", new ComponentViewModel
				{
					Page = page,
					PageUIC = uic,
					PageDto = (PageDto)page
				});
		}
	}
}