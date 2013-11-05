using System;
using System.Web;
using System.Web.Http.Filters;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;
using Harbor.UI.Extensions;


namespace Harbor.UI.Http
{
	public class ServerErrorExceptionFilterAttribute : ExceptionFilterAttribute
	{
		public virtual ILogger GetLogger(Type controllerType)
		{
			return new Logger(controllerType);
		}


		public override void OnException(HttpActionExecutedContext context)
		{
			if (context.Exception != null)
			{
				context.Response = context.Request.CreateInternalServerErrorResponse(context.Exception);
			}

			var logger = GetLogger(context.ActionContext.ControllerContext.Controller.GetType());
			logger.Error("{0}:{1}:Exception - {2}, Username: {4}",
				context.Exception,
				context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName,
				context.ActionContext.ActionDescriptor.ActionName,
				context.Exception == null ? "" : context.Exception.Message,
				HttpContext.Current.User.Identity.Name);
		}
	}
}