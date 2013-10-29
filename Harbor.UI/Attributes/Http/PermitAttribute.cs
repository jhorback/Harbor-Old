using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;

namespace Harbor.UI.Http
{
	public class PermitAttribute : AuthorizeAttribute
	{
		UserFeature feature;
		Permissions permissions;

		public PermitAttribute(UserFeature feature, Permissions permissions)
		{
			this.feature = feature;
			this.permissions = permissions;
		}

		public virtual IUserRepository UserRepository
		{
			get { return GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof (IUserRepository)) as IUserRepository; }
		}

		public override void OnAuthorization(HttpActionContext actionContext)
		{
			if (actionContext == null)
				throw new ArgumentNullException("actionContext");

			var userName = HttpContext.Current.User.Identity.Name;
			var user = UserRepository.FindUserByName(userName);
			if (user == null || user.HasPermission(this.feature, this.permissions) == false)
			{
				actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
			}
		}
	}
}