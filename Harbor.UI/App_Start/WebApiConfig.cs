using System.Web.Http;

namespace Harbor.UI
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// enable attribute routing
			config.MapHttpAttributeRoutes();

			config.Filters.Add(new Http.BadRequestFilterAttribute());
			config.Filters.Add(new Http.UnauthorizedFilterAttribute());
			config.Filters.Add(new Http.ServerErrorExceptionFilterAttribute());
			config.Filters.Add(new Http.AuthenticateAttribute());
			config.Filters.Add(new Http.LogRequestAttribute());
		}
	}
}