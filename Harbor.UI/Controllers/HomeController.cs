using System;
using System.Net;
using System.Web.Mvc;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using System.Linq;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.JSPM;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers
{
	public class HomeController : Controller
	{
		IHarborAppRepository appRep;
		IPageRepository pageRep;
		private readonly IRootPagesRepository _rootPagesRepository;

		public HomeController(IHarborAppRepository appRep, IPageRepository pageRep, IRootPagesRepository rootPagesRepository)
		{
			this.appRep = appRep;
			this.pageRep = pageRep;
			_rootPagesRepository = rootPagesRepository;
		}

		public ActionResult Index()
		{
			var app = appRep.GetApp();
			var homePageID = app.HomePageID;
			if (homePageID != null)
			{
				return transferToPage(homePageID);
			}

			var pages = pageRep.FindAll(new PageQuery(q => q.OrderByDescending(p => p.Modified))
				{
					Take = 20,
					CurrentUserName = User.Identity.Name
				}).Select(PageDto.FromPage);
			return View("Index", pages);
		}


		[Route("{pageName:rootpage}")]
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

		public ActionResult FrameNav()
		{
			if (Request.IsAjaxRequest())
				return new HttpNotFoundResult();
			var model = appRep.GetNavigationLinkUrls();
			return PartialView("_FrameNav", model);
		}

		[Route("404/{*aspxerrorpath}")]
		//[ActionName("404")]
		public ActionResult Error404()
		{
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);
			return View("404");
		}

		[Route("Error")]
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
		[Route("jst/{*viewpath}")]
		public PartialViewResult Jst(string viewpath)
		{
			var path = string.Format("{0}/{1}{2}", "~/Views/", viewpath, ".cshtml");
			return PartialView(path);
		}


		public JsonResult JSPM(string name)
		{
			var package = PackageTable.Packages.GetPackage(name);
			return Json(JavaScriptPackageDto.FromIJavaScriptPackage(package), JsonRequestBehavior.AllowGet);
		}


		[Permit(UserFeature.SystemSettings)]
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


		public ViewResult AppJsApi()
		{
			return View("ApplicationJsApi");
		}

		public ViewResult About()
		{
			return View("About");
		}

		public string KeepAlive()
		{
			return DateTime.Now.ToLongTimeString();
		}
	}
}
