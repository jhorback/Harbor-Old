using System;
using System.Web.Mvc;
using Harbor.Domain.Files;
using Harbor.Domain.Security;

namespace Harbor.UI
{
	public class FilePermitAttribute : ActionFilterAttribute
	{
		Permissions permissions;

		public FilePermitAttribute(Permissions permissions)
		{
			this.permissions = permissions;
		}

		public IFileRepository FileRepository
		{
			get { return DependencyResolver.Current.GetService(typeof(IFileRepository)) as IFileRepository; }
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (filterContext == null)
				throw new ArgumentNullException("filterContext");

			var userName = filterContext.HttpContext.User.Identity.Name;
			var fileID = filterContext.RouteData.Values["id"];
			var file = FileRepository.FindById(fileID);
			if (file != null && file.HasPermission(userName, this.permissions) == false)
				filterContext.Result = new HttpUnauthorizedResult();
		}
	}
}