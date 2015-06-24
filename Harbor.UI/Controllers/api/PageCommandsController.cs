using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Harbor.Domain.Command;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Commands;
using Harbor.Domain.Pages.Queries;
using Harbor.Domain.Query;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
	[Authorize, RoutePrefix("api/pages/{id:int}")]
    public class PageCommandsController : ApiController
    {
		private readonly ICommandService _commandService;
		private readonly IQueryService _queryService;

		public PageCommandsController(
			ICommandService commandService,
			IQueryService queryService
			)
		{
			_commandService = commandService;
			_queryService = queryService;
		}


		[HttpPost, Http.PagePermit(Permissions.All), Route("AddNewPageToLinks")]
		public async Task<HttpResponseMessage> AddNewPageToLinks(int id, AddNewPageToLinks command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddExistingPageToLinks")]
		public async Task<HttpResponseMessage> AddExistingPageToLinks(int id, AddExistingPageToLinks command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("ResetPageLayout")]
		public async Task<HttpResponseMessage> ResetPageLayout(int id, ResetPageLayout command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddTemplateContent")]
		public async Task<HttpResponseMessage> AddTemplateContent(int id, AddTemplateContent command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("DeleteTemplateContent")]
		public async Task<HttpResponseMessage> DeleteTemplateContent(int id, DeleteTemplateContent command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("UpdateRootPages")]
		public async Task<HttpResponseMessage> UpdateRootPages(int id, UpdateRootPages command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		#region Title
		[HttpPost, Http.PagePermit(Permissions.All), Route("EnableTitleBackground")]
		public async Task<HttpResponseMessage> EnableTitleBackground(int id, EnableTitleBackground command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("HideTitlebar")]
		public async Task<HttpResponseMessage> HideTitlebar(int id, HideTitleBar command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("MoveTitleBackground")]
		public async Task<HttpResponseMessage> MoveTitleBackground(int id, MoveTitleBackground command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}
		#endregion


		async Task<HttpResponseMessage> pageResponse(int id)
		{
			var queryParams = new PageQueryParams { PageID = id };
			var page = await _queryService.GetQuery<IPageQuery>().ExecuteFromCacheAsync(queryParams);
			return Request.CreateOKResponse(PageDto.FromPage(page));
		}
	}
}
