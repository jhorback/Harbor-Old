using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Harbor.Domain.App;

namespace Harbor.UI
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			var mvcConstraintsResolver = new System.Web.Mvc.Routing.DefaultInlineConstraintResolver();
			mvcConstraintsResolver.ConstraintMap.Add("rootpage", typeof(RootPageConstraint));
			routes.MapMvcAttributeRoutes(mvcConstraintsResolver);


			registerApiRoutes(routes);
			registerSiteRoutes(routes);
		}

		private static void registerApiRoutes(RouteCollection routes)
		{
			routes.MapHttpRoute(
				name: "UsersApi",
				routeTemplate: "api/users/{userName}",
				defaults: new { controller = "Users", userName = RouteParameter.Optional }
			);

			routes.MapHttpRoute(
				name: "SettingsApi",
				routeTemplate: "api/settings/{name}",
				defaults: new { controller = "Settings", name = RouteParameter.Optional }
			);

			//routes.MapHttpRoute(
			//	name: "PageCommand",
			//	routeTemplate: "api/pages/{id}/{commandName}",
			//	defaults: new { controller = "Pages", action = "ExecuteCommand" }
			//);


			routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}

		
		private static void registerSiteRoutes(RouteCollection routes)
		{
			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{*pathInfo}",
				defaults: new { controller = "Home", action = "Index", pathInfo = UrlParameter.Optional }
			);
		}
	}
}