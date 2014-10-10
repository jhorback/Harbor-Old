using System.Net.Http;
using System.Web.Http;
using Harbor.Domain.Command2;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Commands;
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

		public PageCommandsController(
			IPageRepository pageRep,
			ICommandService commandService
			)
		{
			_pageRep = pageRep;
			_commandService = commandService;
		}


		[HttpPost, Http.PagePermit(Permissions.All), Route("AddNewPageToLinks")]
		public HttpResponseMessage AddNewPageToLinks(int id, AddNewPageToLinks command)
		{
			_commandService.Execute(command);
			return getPage(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddExistingPageToLinks")]
		public HttpResponseMessage AddExistingPageToLinks(int id, AddExistingPageToLinks command)
		{
			_commandService.Execute(command);
			return getPage(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("ResetPageLayout")]
		public HttpResponseMessage ResetPageLayout(int id, ResetPageLayout command)
		{
			_commandService.Execute(command);
			return getPage(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddTemplateContent")]
		public HttpResponseMessage AddTemplateContent(int id, AddTemplateContent command)
		{
			_commandService.Execute(command);
			return getPage(id);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("DeleteTemplateContent")]
		public HttpResponseMessage DeleteTemplateContent(int id, DeleteTemplateContent command)
		{
			_commandService.Execute(command);
			return getPage(id);
		}

		/*
		 * await _pageCommandService.ExecuteAsync(command);
		 * return await pageResponse(id);
		 * 
		 * */
		

		private HttpResponseMessage getPage(int id)
		{
			var page = _pageRep.FindById(id);
			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse(PageDto.FromPage(page));
		}
	}
}
