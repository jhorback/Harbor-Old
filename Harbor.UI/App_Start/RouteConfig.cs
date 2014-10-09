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

			// enable mvc attribute routing (api is setup in WebApiConfig)
			var mvcConstraintsResolver = new System.Web.Mvc.Routing.DefaultInlineConstraintResolver();
			mvcConstraintsResolver.ConstraintMap.Add("rootpage", typeof(RootPageConstraint));
			routes.MapMvcAttributeRoutes(mvcConstraintsResolver);


			routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);

			//routes.MapRoute(
			//	name: "Default",
			//	url: "{controller}/{action}/{*pathInfo}",
			//	defaults: new { controller = "Home", action = "Index", pathInfo = UrlParameter.Optional }
			//);
		}
	}
}