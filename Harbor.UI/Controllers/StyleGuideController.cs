using System.Web.Mvc;
using System.Web.WebPages;
using Harbor.Domain.AppMenu.Queries;
using Harbor.Domain.Query;
using Harbor.Domain.Security;



namespace Harbor.UI.Controllers
{
	[Permit(UserFeature.SystemSettings, Permissions.Read), RoutePrefix("styleguide")]
	public class StyleGuideController : Controller
	{
		private readonly IQueryService _queryService;

		public StyleGuideController(IQueryService queryService)
		{
			_queryService = queryService;
		}

		[Route("{menuId}", Name = "NewStyleGuidePage")]
		public ActionResult ShowStyleGuidePage(string menuId)
		{
			var url = Request.Url.ToString().ToLower();
			var title = "";

			var menuItems = _queryService.GetQuery<MenuQuery>().ExecuteFromCache();
			foreach (var item in menuItems)
			{
				if (item.url != null && url.IndexOf(item.url.ToLower()) > -1)
				{
					title = item.text;
					break;
				}
			}

			if (string.IsNullOrEmpty(title))
			{
				title = "Style Guide";
			}

			ViewBag.Title = title;

			return View(menuId);
		}
	}
}
