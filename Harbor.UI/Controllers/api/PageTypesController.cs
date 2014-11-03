using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Harbor.Domain.Pages.Queries;

namespace Harbor.UI.Controllers.Api
{
	[RoutePrefix("api/pagetypes")]
    public class PageTypesController : ApiController
    {
		private readonly IPageTypesQuery _pageTypesQuery;

		public PageTypesController(IPageTypesQuery pageTypesQuery)
		{
			_pageTypesQuery = pageTypesQuery;
		}

		[HttpGet, Route("")]
		public async Task<IEnumerable<PageTypeDto>> Get([FromUri]PageTypesQueryParams queryParams)
		{
			return await _pageTypesQuery.ExecuteFromCacheAsync(queryParams);
		}
    }
}