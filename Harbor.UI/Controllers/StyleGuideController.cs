using System.Linq;
using System.Web.Mvc;
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

		[Route("{menuId}")]
		public ActionResult ShowStyleGuidePage(string menuId)
		{
			var url = Request.Url.ToString().ToLower();
			MenuItemDto currentItem = null;
			var title = "";
			var category = "";

			var menuItems = _queryService.GetQuery<MenuQuery>().ExecuteFromCache();
			foreach (var item in menuItems)
			{
				if (item.url != null && url.IndexOf(item.url.ToLower()) > -1)
				{
					currentItem = item;
					break;
				}
			}

			if (currentItem != null)
			{
				ViewBag.Title = currentItem.text + " - Style Guide";
				ViewBag.PageTitle = currentItem.text;

				var parentItem = menuItems.FirstOrDefault(i => i.id == currentItem.parentId);
				if (parentItem != null)
				{
					ViewBag.Category = parentItem.text;
				}
			}
			else
			{
				ViewBag.PageTitle = "Style Guide";
				ViewBag.Title = "Style Guide";
			}

			return View(menuId);
		}
	}
}
