using System.Web.Mvc;
using System.Web.Routing;
using Harbor.Domain.App;

namespace Harbor.UI
{
	public class RootPageConstraint : IRouteConstraint
	{
		private readonly IRootPagesRepository _rootPagesRepository;

		public RootPageConstraint()
			: this(DependencyResolver.Current.GetService<IRootPagesRepository>())
		{
		}

		public RootPageConstraint(IRootPagesRepository rootPagesRepository)
		{
			_rootPagesRepository = rootPagesRepository;
		}

		public bool Match(System.Web.HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
		{
			var pageName = values["pageName"] as string;
			return _rootPagesRepository.IsARootPage(pageName);
		}
	}
}