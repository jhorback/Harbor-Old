using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;
using Harbor.Domain;
using Harbor.Domain.AppMenu.Queries;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.PageTypeAdmin.Queries;
using Harbor.Domain.Query;
using Harbor.Domain.Security;
using Harbor.UI.Models.Setting;
using Harbor.UI.Models.User;

namespace Harbor.UI.Controllers
{
	[RoutePrefix("user")]
    public class UserController : Controller
    {
		readonly IUserRepository _userRep;
		readonly ICurrentUserRepository _currentUserRep;
		readonly IFileRepository _fileRep;
		readonly ISettingsViewModelRepository _settingsViewModelRepository;
	    private readonly ILogger _logger;
		private readonly IPageTypeQuery _pageTypeQuery;
		private readonly IQueryService _queryService;

		public UserController(
			IUserRepository userRep,
			ICurrentUserRepository currentUserRep,
			IFileRepository fileRep,
			ISettingsViewModelRepository settingsViewModelRepository,
			ILogger logger,
			IPageTypeQuery pageTypeQuery,
			IQueryService queryService
			)
		{
			_userRep = userRep;
			_currentUserRep = currentUserRep;
			_fileRep = fileRep;
			_settingsViewModelRepository = settingsViewModelRepository;
			_logger = logger;
		    _pageTypeQuery = pageTypeQuery;
			_queryService = queryService;
		}


		[HttpGet, Route("~/signin/{*pathInfo}"), Route("signin/{*pathInfo}")]
		public ViewResult SignIn()
		{
			return View("SignIn");
		}

		[HttpPost, Route("~/signin/{*pathInfo}"), Route("signin/{*pathInfo}")]
		public HttpStatusCodeResult SignIn(string username, string password, bool? rememberMe)
		{
			var user = _userRep.FindUserByName(username);
			if (user != null && user.IsPasswordValid(password))
			{
				if (user.Enabled == false)
					return new HttpStatusCodeResult(HttpStatusCode.BadRequest,
						string.Format("{0} is disabled.", user.UserName));

				FormsAuthentication.SetAuthCookie(username, rememberMe ?? false);
				return new HttpStatusCodeResult(HttpStatusCode.NoContent);
			}
			
			return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "The username or password is incorrect.");
		}

		[HttpGet, Route("signout")]
		public ActionResult SignOut()
		{
			FormsAuthentication.SignOut();
			if (Request.IsAjaxRequest())
				return new HttpStatusCodeResult(HttpStatusCode.NoContent);
			return RedirectToRoute("Home");
		}

		[Route("SessionApp")]
		public PartialViewResult SessionApp()
		{	
			var model = _currentUserRep.GetCurrentUserDto();
			var menu = _queryService.GetQuery<MenuQuery>().ExecuteFromCache();
			ViewBag.Menu = menu;
			return PartialView("SessionApp", model);
		}
		
		[Authorize, HttpGet, Route("Account")]
		public ViewResult Account()
		{
			return View("Account");
		}

		[Permit(UserFeature.Pages, Permissions.Read), HttpGet, Route("Pages/{*pathInfo}")]
		public ViewResult Pages()
		{
			return View("Pages");
		}

		[Permit(UserFeature.Files, Permissions.Read), HttpGet, Route("Files/{*pathInfo}")]
		public ViewResult Files()
		{
			return View("Files");
		}

		[Permit(UserFeature.Users, Permissions.Read), HttpGet, Route("Admin/{*pathInfo}")]
		public ViewResult Admin()
		{
			return View("Admin");
		}

		[Authorize, HttpGet, Route("Settings")]
		public ViewResult Settings()
		{
			var model = _settingsViewModelRepository.GetSettingsViewModel(User.Identity.Name);
			return View("Settings", model);
		}

		[HttpGet, Route("PageTypeAdmin")]
		[Permit(UserFeature.Pages, Permissions.All)]
		public async Task<ViewResult> PageTypeAdmin()
		{
			var pageTypes = await _pageTypeQuery.ExecuteFromCacheAsync();
			return View("PageTypeAdmin", pageTypes);
		}

		// UPLOAD/DOWNLOAD files are part of the FileController

		//[Permit(UserFeature.Files, Permissions.Create), Route("Upload")]
		//public JsonResult Upload()
		//{
		//	// to truly handle multiple files need to return an array
		//	// if  more than one file
		//	Harbor.Domain.Files.File returnFile = null;
		//	foreach (string file in Request.Files)
		//	{
		//		returnFile = _fileRep.Create(User.Identity.Name, Request.Files[file]);
		//	}

		//	_fileRep.Save();

		//	var fileDto = (FileDto)returnFile;
		//	return new JsonResult { Data = fileDto };
		//	//return Request.CreateOKResponse(fileDto);
		//	//return new HttpStatusCodeResult(HttpStatusCode.OK);
		//}

		//// will have ext and perhaps name as well
		//[FilePermit(Permissions.Read), Route("Download")]
		//public ActionResult Download(string id, FileResolution res = FileResolution.Original, int? max = null, string name = null)
		//{
		//	var file = _fileRep.FindById(id);
		//	if (file == null)
		//	{
		//		_logger.Info("Download: File does not exist in the database. ID: {0}", id);
		//		return new HttpStatusCodeResult(HttpStatusCode.NotFound);
		//	}

		//	var path = file.GetPhysicalPath(res, max);
		//	if (System.IO.File.Exists(path) == false)
		//	{
		//		_logger.Warn("Download: File exists in database but not on file system. File: {0}", file);
		//		return new HttpStatusCodeResult(HttpStatusCode.NotFound);				
		//	}
		//	return File(path, file.ContentType);
		//}

		//public ActionResult Thumbnail(string name)
		//{
		//	var path = FileUrls.GetThumbUrl(name);
		//	return File(path, "image/png");
		//}
    }
}
