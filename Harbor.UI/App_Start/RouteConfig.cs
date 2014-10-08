﻿using System.Web.Http;
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
			routes.MapMvcAttributeRoutes();

			registerApiRoutes(routes);
			// registerErrorRoutes(routes);
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

			routes.MapHttpRoute(
				name: "PageCommand",
				routeTemplate: "api/pages/{id}/{action}",
				defaults: new { controller = "PageCommands" }
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


		//private static void registerErrorRoutes(RouteCollection routes)
		//{
		//	routes.MapRoute(
		//		name: "404",
		//		url: "404/{*aspxerrorpath}",
		//		defaults: new { controller = "Home", action = "404" }
		//	);

		//	routes.MapRoute(
		//		name: "Error",
		//		url: "Error",
		//		defaults: new { controller = "Home", action = "Error" }
		//	);
		//}

		
		private static void registerSiteRoutes(RouteCollection routes)
		{
			

			routes.MapRoute(
				name: "JST",
				url: "jst/{*viewpath}",
				defaults: new { controller = "Home", action = "JST", jst = true }
			);

			routes.MapRoute(
				name: "SignIn",
				url: "signin/{*pathInfo}",
				defaults: new {  controller = "User", action = "SignIn" }
			);

			routes.MapRoute(
				name: "RootPages",
				url: "{pageName}",
				defaults: new { controller = "Home", action = "RootPage" },
				constraints: new
                {
                    pageName = new RootPageConstraint()
                }
			);

			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{*pathInfo}",
				defaults: new { controller = "Home", action = "Index", pathInfo = UrlParameter.Optional }
			);
		}
	}
}