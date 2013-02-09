using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.Setting;
using Harbor.UI.Models.User;
using Harbor.Domain.Files;
using System.IO;
using System;

namespace Harbor.UI.Controllers
{
    public class UserController : Controller
    {
		IUserRepository userRep;
		CurrentUserRepository currentUserRep;
		IPageRepository pageRep;
		IFileRepository fileRep;
		SettingsViewModelRepository settingsViewModelRepository;

		public UserController(IUserRepository userRep, CurrentUserRepository currentUserRep,
			IPageRepository pageRep, IFileRepository fileRep, SettingsViewModelRepository settingsViewModelRepository)
		{
			this.userRep = userRep;
			this.currentUserRep = currentUserRep;
			this.pageRep = pageRep;
			this.fileRep = fileRep;
			this.settingsViewModelRepository = settingsViewModelRepository;
		}

		public ViewResult SignIn()
		{
			return View("SignIn");
		}

		[HttpPost]
		public HttpStatusCodeResult SignIn(string username, string password, bool? rememberMe)
		{
			var user = userRep.FindUserByName(username);
			if (user != null && user.IsPasswordValid(password))
			{
				if (user.Enabled == false)
					return new HttpStatusCodeResult(HttpStatusCode.BadRequest,
						string.Format("{0} is disabled.", user.UserName));

				var currentUser = currentUserRep.GetCurrentUserDto(user.UserName);
				FormsAuthentication.SetAuthCookie(username, rememberMe ?? false);
				return new HttpStatusCodeResult(HttpStatusCode.NoContent);
			}
			
			return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "The username or password is incorrect.");
		}

		[HttpGet]
		public ActionResult SignOut()
		{
			FormsAuthentication.SignOut();
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.NoContent);
			return RedirectToAction("Index", "Home");
		}

		public PartialViewResult SessionApp()
		{	
			var model = currentUserRep.GetCurrentUserDto(User.Identity.Name);
			return PartialView("SessionApp", model);
		}
		
		[Authorize]
		public ViewResult Account()
		{
			return View("Account");
		}

		[Permit(UserFeature.Pages, Permissions.Read)]
		public ViewResult Pages()
		{
			return View("Pages");
		}

		[Permit(UserFeature.Files, Permissions.Read)]

		[Permit(UserFeature.Users, Permissions.Read)]
		public ViewResult Admin()
		{
			return View("Admin");
		}

		[Authorize]
		public ViewResult Settings()
		{
			var model = settingsViewModelRepository.GetSettingsViewModel(User.Identity.Name);
			return View("Settings", model);
		}

		[PagePermit(Permissions.Read)]
		public ActionResult Page(int? id)
		{
			var page = pageRep.FindById(id);
			if (page == null)
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);

			ViewBag.HasWritePermissions = page.HasPermission(User.Identity.Name, Permissions.CreateAndUpdate);
			ViewBag.PageDto = (PageDto)page;
			return View("Page", page);
		}

		[Permit(UserFeature.Files, Permissions.Create)]
		public ActionResult Upload()
		{
			foreach (string file in Request.Files)
			{
				fileRep.Create(User.Identity.Name, Request.Files[file]);
			}
			return new HttpStatusCodeResult(HttpStatusCode.NoContent);
		}

		// will have ext and perhaps name as well
		[FilePermit(Permissions.Read)]
		public ActionResult Download(string id, FileResolution res = FileResolution.Original, int? max = null, string name = null)
		{
			var file = fileRep.FindById(id);
			if (file == null)
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);
			var path = file.GetPhysicalPath(res, max);
			return File(path, file.ContentType);

		}

		public ActionResult Thumbnail(string name)
		{
			var path = FileUrls.GetThumbUrl(name);
			return File(path, "image/png");
		}
    }
}
