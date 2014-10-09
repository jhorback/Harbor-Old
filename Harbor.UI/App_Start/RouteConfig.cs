using System.Web.Mvc;
using System.Web.Routing;

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
		}
	}
}