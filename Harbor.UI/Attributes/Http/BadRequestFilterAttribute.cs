using System.Web.Http.Filters;
using Harbor.Domain;
using Harbor.UI.Extensions;

namespace Harbor.UI.Http
{
	public class BadRequestFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			if (context.Exception != null && context.Exception.GetType() == typeof(DomainValidationException))
			{
				context.Response = context.Request.CreateBadRequestResponse(context.Exception.Message);
			}
		}
	}
}