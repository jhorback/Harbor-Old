using System.Web.Mvc;

namespace Harbor.UI
{
	public class ServerErrorExceptionFilterAttribute : HandleErrorAttribute 
    {
		public override void OnException(ExceptionContext exceptionContext)
		{
			base.OnException(exceptionContext);
			if (exceptionContext.Result == null)
			{
				return;
			}

			var request = exceptionContext.HttpContext.Request;
			if (request.IsAjaxRequest() == false)
				return;

			var jsonDto = new Harbor.UI.Models.InternalServerErrorDto
				{
					exception = exceptionContext.Exception.Message,
					exceptionType = exceptionContext.Exception.GetType().FullName,
					stackTrace = exceptionContext.Exception.StackTrace
				};
			var jsonResult = new JsonResult {Data = jsonDto, JsonRequestBehavior = JsonRequestBehavior.AllowGet};
			exceptionContext.HttpContext.Response.Clear();
			exceptionContext.Result = jsonResult;
			//exceptionContext.HttpContext.Response.StatusCode = 500;
			exceptionContext.ExceptionHandled = true;
			jsonResult.ExecuteResult(exceptionContext);
			exceptionContext.HttpContext.Response.End();
		}
	}
}