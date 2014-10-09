using System;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.UI
{
	public class PagePermitAttribute : ActionFilterAttribute
	{
		PageFeature feature;
		Permissions permissions;

		public PagePermitAttribute(Permissions permissions)
			: this(PageFeature.Page, permissions)
		{
		}

		public PagePermitAttribute(PageFeature feature, Permissions permissions)
		{
			this.feature = feature;
			this.permissions = permissions;
		}

		public virtual IPageRepository PageRepository
		{
			get { return DependencyResolver.Current.GetService(typeof(IPageRepository)) as IPageRepository; }
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (filterContext == null)
				throw new ArgumentNullException("filterContext");

			var values = filterContext.RouteData.Values;
			if (values.ContainsKey("id") == false)
			{
				throw new HttpException(404, "Not found");				
			}

			var userName = filterContext.HttpContext.User.Identity.Name;
			var pageID = Convert.ToInt32(values["id"]);
			var page = PageRepository.FindById(pageID);
			if (page == null)
			{
				throw new HttpException(404, "Not found");				
			}

			if (page.HasPermission(userName, this.feature, this.permissions) == false)
			{
				filterContext.Result = new HttpUnauthorizedResult();
			}
		}
	}
}