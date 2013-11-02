using System;
using System.Web.Mvc;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;

namespace Harbor.UI
{
	public class LogRequestAttribute : ActionFilterAttribute, IActionFilter
	{
		public virtual ILogger GetLogger(Type controllerType)
		{
			return new Logger(controllerType);
		}

		void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
		{
			var logger = GetLogger(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType);
			logger.Debug("{1}:{0}:Executing IP: {2}, Username: {3}",
				filterContext.ActionDescriptor.ActionName,
				filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
				filterContext.HttpContext.Request.UserHostAddress,
				filterContext.HttpContext.User.Identity.Name);
		}

		void IActionFilter.OnActionExecuted(ActionExecutedContext filterContext)
		{
			var logger = GetLogger(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType);
			logger.Debug("{1}:{0}:Executed IP: {2}, Username: {3}",
				filterContext.ActionDescriptor.ActionName,
				filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
				filterContext.HttpContext.Request.UserHostAddress,
				filterContext.HttpContext.User.Identity.Name);
		}
	}
}