using System.Web.Mvc;
using Harbor.Domain;

namespace Harbor.UI
{
	public class LogRequestAttribute : ActionFilterAttribute, IActionFilter
	{
		public ILogger Logger
		{
			get
			{
				return DependencyResolver.Current.GetService<ILogger>();
			}
		}

		void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
		{
			Logger.Debug("OnActionExecuting - Action: {0}, Controller: {1}, IP: {2}, Username: {3}",
				filterContext.ActionDescriptor.ActionName,
				filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
				filterContext.HttpContext.Request.UserHostAddress,
				filterContext.HttpContext.User.Identity.Name);
		}

		void IActionFilter.OnActionExecuted(ActionExecutedContext filterContext)
		{
			Logger.Debug("OnActionExecuted - Action: {0}, Controller: {1}, IP: {2}, Username: {3}",
				filterContext.ActionDescriptor.ActionName,
				filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
				filterContext.HttpContext.Request.UserHostAddress,
				filterContext.HttpContext.User.Identity.Name);
		}
	}
}