using System.Web.Http.Filters;
using Harbor.UI.Extensions;

namespace Harbor.UI.Http
{
	public class ServerErrorExceptionFilterAttribute : ExceptionFilterAttribute 
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception != null)
            {
	            context.Response = context.Request.CreateInternalServerErrorResponse(context.Exception);
            }
        }
    }
}