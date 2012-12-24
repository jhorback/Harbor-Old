using System;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.UI
{
	public class PagePermitAttribute : ActionFilterAttribute
	{
		PageFunctionalArea functionalArea;
		Permissions permissions;

		public PagePermitAttribute(Permissions permissions)
			: this(PageFunctionalArea.Page, permissions)
		{
		}

		public PagePermitAttribute(PageFunctionalArea functionalArea, Permissions permissions)
		{
			this.functionalArea = functionalArea;
			this.permissions = permissions;
		}

		public IPageRepository PageRepository
		{
			get { return DependencyResolver.Current.GetService(typeof(IPageRepository)) as IPageRepository; }
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (filterContext == null)
				throw new ArgumentNullException("filterContext");

			var userName = filterContext.HttpContext.User.Identity.Name;
			var pageID = Convert.ToInt32(filterContext.RouteData.Values["id"]);
			var page = PageRepository.FindById(pageID);
			if (page != null && page.HasPermission(userName, this.functionalArea, this.permissions) == false)
				filterContext.Result = new HttpUnauthorizedResult();
		}
	}
}