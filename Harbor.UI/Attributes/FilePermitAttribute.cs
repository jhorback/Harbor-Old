using System;
using System.Web;
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

		public virtual IFileRepository FileRepository
		{
			get { return DependencyResolver.Current.GetService(typeof(IFileRepository)) as IFileRepository; }
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (filterContext == null)
				throw new ArgumentNullException("filterContext");

			var userName = filterContext.HttpContext.User.Identity.Name;
			var fileParam = filterContext.RouteData.Values["id"];
			if (fileParam == null)
			{
				throw new HttpException(404, "Not found");
			}

			var fileID = Guid.Parse(fileParam.ToString());
			var file = FileRepository.FindById(fileID);
			if (file == null)
			{
				throw new HttpException(404, "Not found");				
			}

			if (file.HasPermission(userName, this.permissions) == false)
			{
				filterContext.Result = new HttpUnauthorizedResult();
			}
		}
	}
}