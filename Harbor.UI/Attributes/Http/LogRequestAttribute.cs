using System;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;

namespace Harbor.UI.Http
{
	public class LogRequestAttribute : ActionFilterAttribute
	{
		public virtual ILogger GetLogger(Type controllerType)
		{
			return new Logger(controllerType);
		}


		public override void OnActionExecuting(HttpActionContext actionContext)
		{
			var logger = GetLogger(actionContext.ControllerContext.Controller.GetType());
			logger.Debug("api/{0}:{1}:Executing - RequestUri: {2}, Username: {3}",
				actionContext.ControllerContext.ControllerDescriptor.ControllerName,
				actionContext.ActionDescriptor.ActionName,
				actionContext.Request.RequestUri,
				HttpContext.Current.User.Identity.Name);

		}

		public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
		{
			var logger = GetLogger(actionExecutedContext.ActionContext.ControllerContext.Controller.GetType());
			logger.Info("api/{0}:{1}:Executed - Response: {2}, Username: {3}",
				actionExecutedContext.ActionContext.ControllerContext.ControllerDescriptor.ControllerName,
				actionExecutedContext.ActionContext.ActionDescriptor.ActionName,
				actionExecutedContext.Response.StatusCode,
				HttpContext.Current.User.Identity.Name);
		}
	}
}