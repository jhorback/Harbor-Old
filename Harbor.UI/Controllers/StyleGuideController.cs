using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Security;
using Harbor.UI.Models.StyleGuide;

namespace Harbor.UI.Controllers
{
	[Permit(UserFeature.SystemSettings, Permissions.Read), RoutePrefix("styleguide")]
	public class StyleGuideController : Controller
	{
		StyleGuidePageRepository repository;

		public StyleGuideController(StyleGuidePageRepository repository)
		{
			this.repository = repository;
		}

		[Route("{pageKey=home}")]
		public ActionResult Index(string pageKey)
		{
			var page = repository.GetPage(pageKey);
			if (page == null || page.Key == "Home")
			{
				if (pageKey == null)
				{
					pageKey = "Home";
					ViewBag.Title = "Style Guide";
				}
				else ViewBag.Title = pageKey;
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

		[Route("testapp")]
		public ViewResult TestApp()
		{
			return View("TestApp");
		}
	}
}
