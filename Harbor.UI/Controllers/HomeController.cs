using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Harbor.UI.Controllers
{
	public class HomeController : Controller
	{
		//
		// GET: /Home/

		public ViewResult Index()
		{
			return View("Index");
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
