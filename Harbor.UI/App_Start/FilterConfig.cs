using System.Web.Http.Filters;
using System.Web.Mvc;

namespace Harbor.UI
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new ServerErrorExceptionFilterAttribute());
		}
	}
}