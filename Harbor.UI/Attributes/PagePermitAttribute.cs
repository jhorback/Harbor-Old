using System;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Queries;
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

		public virtual IPageQuery PageQuery
		{
			get
			{
				return DependencyResolver.Current.GetService<IPageQuery>();
			}
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (filterContext == null)
				throw new ArgumentNullException("filterContext");

			var values = filterContext.RouteData.Values;
			object id = null;
			if (values.ContainsKey("id"))
			{
				id = values["id"];
			}
			else if (values.ContainsKey("pageID"))
			{
				id = values["pageID"];
			}

			if (id == null)
			{
				throw new HttpException(404, "Not found");								
			}

			var userName = filterContext.HttpContext.User.Identity.Name;
			var page = PageQuery.ExecuteFromCache(new PageQueryParams { PageID = Convert.ToInt32(id) });
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