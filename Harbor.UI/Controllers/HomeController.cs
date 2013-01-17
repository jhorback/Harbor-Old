using System;
using System.Net;
using System.Web.Mvc;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using System.Linq;
using Harbor.UI.Models;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers
{
	public class HomeController : Controller
	{
		IHarborAppRepository appRep;
		IPageRepository pageRep;

		public HomeController(IHarborAppRepository appRep, IPageRepository pageRep)
		{
			this.appRep = appRep;
			this.pageRep = pageRep;
		}

		public ActionResult Index()
		{
			var app = appRep.GetApp();
			var homePageID = app.HomePageID;
			if (homePageID != null)
			{
				var url = Url.RouteUrl(new { controller = "user", action = "page", id = homePageID});
				Server.TransferRequest(url, true); // change to false to pass query string parameters if you have already processed them
			}

			var pages = pageRep.FindAll(new PageQuery(q => q.OrderByDescending(p => p.Modified))
				{
					Take = 20,
					CurrentUserName = User.Identity.Name
				}).Select(p => (PageDto)p);
			return View("Index", pages);
		}

		public PartialViewResult FrameNav()
		{
			var model = appRep.GetNavigationLinks().Select(i => (NavigationLinkDto)i).ToList();
			return PartialView("_FrameNav", model);
		}

		[ActionName("404")]
		public ActionResult Error404()
		{
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);
			return View("404");
		}

		public ActionResult Error()
		{
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
			return View("Error");
		}

		public ViewResult ThrowError()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Returns the JavaScript templates file.
		/// The viewpath starts with the Views folder and should not have an extension.
		/// </summary>
		/// <param name="viewpath"></param>
		/// <returns></returns>
		public PartialViewResult JST(string viewpath)
		{
			var path = string.Format("{0}/{1}{2}", "~/Views/", viewpath, ".cshtml");
			return PartialView(path);
		}
	}
}
