using System.Net.Http;
using System.Web.Http;
using Harbor.Domain.App;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers.Api
{
	[RoutePrefix("api/appsettings")]
    public class AppSettingsController : ApiController
    {
    	readonly IHarborAppRepository harborApp;
    	private readonly IUserRepository _userRepository;

    	public AppSettingsController(IHarborAppRepository harborApp, IUserRepository userRepository)
		{
			this.harborApp = harborApp;
			_userRepository = userRepository;
		}

		[HttpGet, Route("")]
    	public HttpResponseMessage Get()
        {
			var app = harborApp.GetApp();
			return Request.CreateOKResponse((HarborAppDto)app);
        }

		[HttpPut, Route("")]
		public HttpResponseMessage Put(HarborAppDto app)
        {
			harborApp.SetApp(app, _userRepository.FindUserByName(User.Identity.Name));
			harborApp.Save();
			return Request.CreateOKResponse((HarborAppDto)harborApp.GetApp());
        }
    }
}
