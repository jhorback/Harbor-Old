using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Harbor.Domain.Command;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Commands;
using Harbor.Domain.Pages.Queries;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
	[Authorize, RoutePrefix("api/pages/{id:int}")]
    public class PageCommandsController : ApiController
    {
		IPageRepository _pageRep;
		private readonly ICommandService _commandService;
		private readonly IPageQuery _pageQuery;

		public PageCommandsController(
			IPageRepository pageRep,
			ICommandService commandService,
			IPageQuery pageQuery
			)
		{
			_pageRep = pageRep;
			_commandService = commandService;
			_pageQuery = pageQuery;
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

		[HttpPost, Http.PagePermit(Permissions.All), Route("EnableTitleBackground")]
		public async Task<HttpResponseMessage> EnableTitleBackground(int id, EnableTitleBackground command)
		{
			await _commandService.ExecuteAsync(command);
			return await pageResponse(id);
		}


		async Task<HttpResponseMessage> pageResponse(int id)
		{
			var queryParams = new PageQueryParams { PageID = id };
			///var page = await _pageQuery.ExecuteFromCacheAsync(queryParams);
			var page = _pageQuery.ExecuteFromCache(queryParams);
			return Request.CreateOKResponse(PageDto.FromPage(page));
		}
	}
}
