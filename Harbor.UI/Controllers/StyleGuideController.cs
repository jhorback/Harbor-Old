using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Security;
using Harbor.UI.Models.StyleGuide;

namespace Harbor.UI.Controllers
{
	[Permit(UserFeature.SystemSettings, Permissions.Read)]
	public class StyleGuideController : Controller
	{
		StyleGuidePageRepository repository;

		public StyleGuideController(StyleGuidePageRepository repository)
		{
			this.repository = repository;
		}

		public ActionResult Index(string pageKey)
		{
			var page = repository.GetPage(pageKey);
			if (page == null || page.Key == "Home")
			{
				pageKey = "Home";
				ViewBag.Title = "Style Guide";
			}
			else
			{
				ViewBag.Title = page.Name + " - Style Guide";
			}
			var pages = repository.GetPages();
			return View(pageKey, pages);
		}

		public PartialViewResult PageNav()
		{
			var pages = repository.GetPages();
			return PartialView("_PageNav", pages);
		}
	}
}
