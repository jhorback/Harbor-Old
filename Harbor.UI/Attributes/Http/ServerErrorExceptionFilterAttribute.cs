using System;
using System.Web;
using System.Web.Http.Filters;
using Elmah;
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
			string userName = "Unknown";


			// try to inform elmah
			try
			{
				var httpContext = HttpContext.Current;
				userName = httpContext.User.Identity.Name;

				
				var signal = ErrorSignal.FromContext(httpContext);
				signal.Raise(context.Exception, HttpContext.Current);
			}
			catch (Exception e)
			{
				logger.Error(e);
			}


			// log the error
			logger.Error("{0}:{1}:Exception - {2}, Username: {3}",
				context.Exception,
				context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName,
				context.ActionContext.ActionDescriptor.ActionName,
				context.Exception == null ? "" : context.Exception.Message,
				userName);
		}
	}
}