using System;
using System.Web.Mvc;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;

namespace Harbor.UI
{
	public class LogRequestAttribute : HandleErrorAttribute, IActionFilter
	{
		public virtual ILogger GetLogger(Type controllerType)
		{
			return new Logger(controllerType);
		}

		void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
		{
			if (!filterContext.IsChildAction)
			{
				var logger = GetLogger(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType);
				logger.Debug("{0}:{1}:Executing - Querystring: {2}, IP: {3}, Username: {4}",
					filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
					filterContext.ActionDescriptor.ActionName,
					filterContext.HttpContext.Request.QueryString,
					filterContext.HttpContext.Request.UserHostAddress,
					filterContext.HttpContext.User.Identity.Name);
			}
		}


		void IActionFilter.OnActionExecuted(ActionExecutedContext filterContext)
		{
			if (!filterContext.IsChildAction)
			{
				var logger = GetLogger(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType);
				logger.Info("{0}:{1}:Executed - Result Type: {2}, IP: {3}, Username: {4}",
					filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
					filterContext.ActionDescriptor.ActionName,
					filterContext.Result.GetType().Name,
					filterContext.HttpContext.Request.UserHostAddress,
					filterContext.HttpContext.User.Identity.Name);
			}
		}


		public override void OnException(ExceptionContext exceptionContext)
		{
			var logger = GetLogger(exceptionContext.Controller.GetType());
			logger.Error("{0}:{1}:Exception - {2}, IP: {3}, Username: {4}",
				exceptionContext.Exception,
				exceptionContext.RouteData.Values["controller"],
				exceptionContext.RouteData.Values["action"],
				exceptionContext.Exception.Message,
				exceptionContext.HttpContext.Request.UserHostAddress,
				exceptionContext.HttpContext.User.Identity.Name);
		}
	}
}