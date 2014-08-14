using System;
using System.Web.Http.Filters;
using Harbor.UI.Extensions;

namespace Harbor.UI.Http
{
	public class UnauthorizedFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			if (context.Exception != null && context.Exception.GetType() == typeof(UnauthorizedAccessException))
			{
				context.Response = context.Request.CreateUnauthorizedResponse(context.Exception as UnauthorizedAccessException);
			}
		}
	}
}