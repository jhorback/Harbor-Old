using System;
using System.Web.Mvc;
using Elmah;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;

namespace Harbor.UI
{
	public class ServerErrorExceptionFilterAttribute : HandleErrorAttribute 
    {
		public virtual ILogger GetLogger(Type controllerType)
		{
			return new Logger(controllerType);
		}

		public override void OnException(ExceptionContext exceptionContext)
		{
			base.OnException(exceptionContext);


			logError(exceptionContext);
			

			// inform elmah
			var httpContext = exceptionContext.HttpContext.ApplicationInstance.Context;
			var signal = ErrorSignal.FromContext(httpContext);
			signal.Raise(exceptionContext.Exception, httpContext);


			// change the result if an ajax request
			var request = exceptionContext.HttpContext.Request;
			if (request.IsAjaxRequest() == false)
				return;

			var jsonDto = new Harbor.UI.Models.InternalServerErrorDto
				{
					exception = exceptionContext.Exception.Message,
					exceptionType = exceptionContext.Exception.GetType().FullName
				};
#if DEBUG 
			jsonDto.stackTrace = exceptionContext.Exception.StackTrace;
#endif
			var jsonResult = new JsonResult {Data = jsonDto, JsonRequestBehavior = JsonRequestBehavior.AllowGet};
			exceptionContext.HttpContext.Response.Clear();
			exceptionContext.Result = jsonResult;
			//exceptionContext.HttpContext.Response.StatusCode = 500;
			exceptionContext.ExceptionHandled = true;
			jsonResult.ExecuteResult(exceptionContext);
			exceptionContext.HttpContext.Response.End();
		}


		void logError(ExceptionContext exceptionContext)
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