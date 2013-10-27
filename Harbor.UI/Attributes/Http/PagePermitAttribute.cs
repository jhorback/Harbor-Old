using System;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Harbor.Domain.Pages;
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

		public IPageRepository PageRepository // { get; set; }
		{
			get { return GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IPageRepository)) as IPageRepository; }
		}

		public override void OnAuthorization(HttpActionContext actionContext)
		{
			if (actionContext == null)
				throw new ArgumentNullException("actionContext");

			var userName = HttpContext.Current.User.Identity.Name;
			var pageID = Convert.ToInt32(actionContext.Request.GetRouteData().Values["id"]);
			var page = PageRepository.FindById(pageID);
			if (page != null && page.HasPermission(userName, this.feature, this.permissions) == false)
			{
				actionContext.Response = actionContext.Request.CreateUnauthorizedResponse();
			}
		}
	}
}