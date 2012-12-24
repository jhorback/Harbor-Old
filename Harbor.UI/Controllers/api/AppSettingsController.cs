using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Harbor.Domain.App;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers.Api
{
    public class AppSettingsController : ApiController
    {
		IHarborAppRepository harborApp;

		public AppSettingsController(IHarborAppRepository harborApp)
		{
			this.harborApp = harborApp;
		}

		public HttpResponseMessage Get()
        {
			var app = harborApp.GetApp();
			return Request.CreateOKResponse((HarborAppDto)app);
        }

		public HttpResponseMessage Put(HarborAppDto app)
        {
			harborApp.SetApp(app);
			return Request.CreateOKResponse(app);
        }
    }
}
