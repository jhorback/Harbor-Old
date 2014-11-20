using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Harbor.Domain.Files;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;

namespace Harbor.UI.Http
{
	public class FilePermitAttribute : AuthorizeAttribute
	{
		Permissions permissions;

		public FilePermitAttribute(Permissions permissions)
		{
			this.permissions = permissions;
		}

		public virtual IFileRepository FileRepository
		{
			get { return GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IFileRepository)) as IFileRepository; }
		}

		public override void OnAuthorization(HttpActionContext actionContext)
		{
			if (actionContext == null)
				throw new ArgumentNullException("filterContext");

			var values = actionContext.Request.GetRouteData().Values;
			if (values == null)
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;
			}

			if (!values.ContainsKey("id"))
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;
			}

			var userName = HttpContext.Current.User.Identity.Name;
			var fileID = Guid.Parse(values["id"].ToString());
			var file = FileRepository.FindById(fileID);
			if (file == null)
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;
			}

			if (file.HasPermission(userName, this.permissions) == false)
			{
				actionContext.Response = actionContext.Request.CreateUnauthorizedResponse();
			}
		}
	}
}