using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.Controllers
{
	[RoutePrefix("Home")]
	public class HomeController : Controller
	{
		readonly IHarborAppRepository _appRep;
		readonly IPageRepository _pageRep;
		private readonly IRootPagesRepository _rootPagesRepository;

		public HomeController(
			IHarborAppRepository appRep,
			IPageRepository pageRep,
			IRootPagesRepository rootPagesRepository
			)
		{
			_appRep = appRep;
			_pageRep = pageRep;
			_rootPagesRepository = rootPagesRepository;
		}

		[Route("~/", Name = "Home")]
		public ActionResult Index()
		{
			var app = _appRep.GetApp();
			var homePageID = app.HomePageID;
			if (homePageID != null)
			{
				return transferToPage(homePageID);
			}

			var pages = _pageRep.FindAll(new PageQuery(q => q.OrderByDescending(p => p.Modified))
				{
					Take = 20,
					CurrentUserName = User.Identity.Name
				}).Select(PageDto.FromPage);
			return View("Index", pages);
		}


		[Route("~/{pageName:rootpage}")]
		public ActionResult RootPage(string pageName)
		{
			var pageID = _rootPagesRepository.GetRootPageID(pageName);
			return transferToPage(pageID);
		}

		private ActionResult transferToPage(int? pageId)
		{
			var url = Url.RouteUrl("Page", new { pageId = pageId });
			Server.TransferRequest(url, true); // change to false to pass query string parameters if you have already processed them
			return Content("");
		}

		[Route("FrameNav")]
		public ActionResult FrameNav(Page page)
		{
			if (Request.IsAjaxRequest())
				return new HttpNotFoundResult();

			var model = _appRep.GetNavigationLinkUrls(page);
			return PartialView("_FrameNav", model);
		}

		[Route("~/404/{*aspxerrorpath}")]
		//[ActionName("404")]
		public ActionResult Error404()
		{
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);
			return View("404");
		}

		[Route("~/Error")]
		public ActionResult Error()
		{
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
			return View("Error");
		}

		[Route("ThrowError")]
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
		[Route("~/jst/{*viewpath}")]
		public PartialViewResult Jst(string viewpath)
		{
			var path = string.Format("{0}/{1}{2}", "~/Views/", viewpath, ".cshtml");
			return PartialView(path);
		}

		[Route("~/JSPM")]
		public JsonResult JSPM(string name)
		{
			var package = PackageTable.Packages.GetPackage(name);
			return Json(JavaScriptPackageDto.FromIJavaScriptPackage(package), JsonRequestBehavior.AllowGet);
		}


		[Permit(UserFeature.SystemSettings), Route("JavaScriptPackages")]
		public ViewResult JavaScriptPackages()
		{
			var sPackages = PackageTable.Packages;
			var nonRequiredPackages = sPackages.Where(p => p.RequiresRegistration == false).Select(p => p.Name).ToArray();
			ViewBag.NonRequiredPackages = nonRequiredPackages;

			var packages = sPackages
				.GroupBy<IJavaScriptPackage, string>(p => p.Category ?? "General")
				.ToList();

			return View("JavaScriptPackages", packages);
		}

		[Route("AppJsApi")]
		public ViewResult AppJsApi()
		{
			return View("ApplicationJsApi");
		}

		[Route("About")]
		public ViewResult About()
		{
			return View("About");
		}

		[Route("KeepAlive")]
		public string KeepAlive()
		{
			return DateTime.Now.ToLongTimeString();
		}
	}
}
