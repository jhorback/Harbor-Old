using System.Web.Http;
using Harbor.Data.Repositories;
using Harbor.Domain.Security;
using Newtonsoft.Json;

namespace Harbor.UI
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			var userRep = config.DependencyResolver.GetService(typeof(IUserRepository)) as IUserRepository;
			
			config.Filters.Add(new Http.BadRequestFilterAttribute());			
			config.Filters.Add(new Http.ServerErrorExceptionFilterAttribute());
			config.Filters.Add(new Http.AuthenticateAttribute(userRep));
		}
	}
}