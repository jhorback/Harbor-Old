using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Queries;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;

namespace Harbor.UI.Http
{
	public class PagePermitAttribute : AuthorizeAttribute
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

		public virtual IPageQuery PageQuery
		{
			get
			{
				return GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IPageQuery)) as IPageQuery;
			}
		}

		public override void OnAuthorization(HttpActionContext actionContext)
		{
			if (actionContext == null)
				throw new ArgumentNullException("actionContext");

			var routeData = actionContext.Request.GetRouteData();
			if (routeData == null)
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;
			}

			var values = routeData.Values;
			if (values.ContainsKey("id") == false)
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;				
			}

			var userName = HttpContext.Current.User.Identity.Name;
			var pageID = Convert.ToInt32(values["id"]);
			var page = PageQuery.ExecuteFromCache(new PageQueryParams { PageID = pageID });
			if (page == null)
			{
				actionContext.Response = actionContext.Request.CreateNotFoundResponse();
				return;
			}

			if (page.HasPermission(userName, this.feature, this.permissions) == false)
			{
				actionContext.Response = actionContext.Request.CreateUnauthorizedResponse();
			}
		}
	}
}