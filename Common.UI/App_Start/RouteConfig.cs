using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Common.UI
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);



			routes.MapRoute(
				name: "TestIndex",
				url: "Tests",
				defaults: new { controller = "Tests", action = "Index" }
			);
			routes.MapRoute(
				name: "TestPage",
				url: "Tests/{name}",
				defaults: new { controller = "Tests", action = "Test" }
			);



			routes.MapRoute(
				name: "PackageIndex",
				url: "{controller}",
				defaults: new { controller = "Packages", action = "Index" }
			);
			routes.MapRoute(
				name: "Package",
				url: "{controller}/{name}",
				defaults: new { controller = "Packages", action = "Package" }
			);	
		}
	}
}