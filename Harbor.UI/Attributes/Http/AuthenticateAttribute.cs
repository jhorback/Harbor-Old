using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;
using System.Web.Security;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;

namespace Harbor.UI.Http
{
	public class AuthenticateAttribute : AuthorizationFilterAttribute
	{
		
		public IUserRepository UserRepository
		{
			get; set;
		}


		public override void OnAuthorization(HttpActionContext actionContext)
		{
			var httpContext = System.Web.HttpContext.Current;
			if (httpContext.User.Identity.IsAuthenticated)
				return;

			string userName = httpContext.Request.Headers["username"];
			string password = httpContext.Request.Headers["password"];
			var isAuthenticated = UserRepository.FindUserByName(userName).Authenticate(password);
			if (string.IsNullOrEmpty(userName) || isAuthenticated == false)
			{
				actionContext.Response = actionContext.Request.CreateUnauthorizedResponse();
			}
			else
			{
				// jch* kind of cheesy for now - but ok for testing
				// requires requesting twice the first time so the auth cookie is set.
				FormsAuthentication.SetAuthCookie(userName, false);
			}
		}
	}
}