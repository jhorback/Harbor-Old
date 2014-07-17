using System.Net.Http;
using System.Web.Http;
using Harbor.Domain.App;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers.Api
{
    public class AppSettingsController : ApiController
    {
    	readonly IHarborAppRepository harborApp;
    	private readonly IUserRepository _userRepository;

    	public AppSettingsController(IHarborAppRepository harborApp, IUserRepository userRepository)
		{
			this.harborApp = harborApp;
			_userRepository = userRepository;
		}

    	public HttpResponseMessage Get()
        {
			var app = harborApp.GetApp();
			return Request.CreateOKResponse((HarborAppDto)app);
        }

		public HttpResponseMessage Put(HarborAppDto app)
        {
			harborApp.SetApp(app, _userRepository.FindUserByName(User.Identity.Name));
			harborApp.Save();
			return Request.CreateOKResponse(app);
        }
    }
}
