using System;
using System.Web;
using System.Web.Mvc;
using Harbor.Domain.Security;

namespace Harbor.UI
{
	public class PermitAttribute : AuthorizeAttribute
	{
		UserFeature feature;
		Permissions permissions;


		public PermitAttribute(UserFeature feature, Permissions permissions = Permissions.All)
		{
			this.feature = feature;
			this.permissions = permissions;
		}

		public IUserRepository UserRepository
		{
			get
			{
				return DependencyResolver.Current.GetService<IUserRepository>();
			}
		}

		public override void OnAuthorization(AuthorizationContext filterContext)
		{
			if (filterContext == null)
			{
				throw new ArgumentNullException("filterContext");
			}

			var userName = filterContext.HttpContext.User.Identity.Name;
			var user = UserRepository.FindUserByName(userName);
			if (user == null || user.HasPermission(this.feature, this.permissions) == false)
			{
				filterContext.Result = new HttpUnauthorizedResult();
			}

			SetCachePolicy(filterContext);
		}

		public void CacheValidationHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
		{
			validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
		}

		protected void SetCachePolicy(AuthorizationContext filterContext)
		{
			// disable caching, so that a user that is not logged in cannot accidentally get a cached version of a secure page
			HttpCachePolicyBase cachePolicy = filterContext.HttpContext.Response.Cache;
			cachePolicy.SetProxyMaxAge(new TimeSpan(0));
			cachePolicy.AddValidationCallback(CacheValidationHandler, null /* data */);
		}
	}
}