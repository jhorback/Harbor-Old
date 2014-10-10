using System.Net.Http;
using System.Web.Http;
using Harbor.Domain;
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
		private readonly IPageFactory _pageFactory;
		private readonly IPageCommandService _commandService;

		public PageCommandsController(IPageRepository pageRep, IPageFactory pageFactory, IPageCommandService commandService)
		{
			_pageRep = pageRep;
			_pageFactory = pageFactory;
			_commandService = commandService;
		}


		[HttpPost, Http.PagePermit(Permissions.All), Route("AddNewPageToLinks")]
		public HttpResponseMessage AddNewPageToLinks(int id, AddNewPageToLinks command)
		{
			return executeCommand(id, command);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddExistingPageToLinks")]
		public HttpResponseMessage AddExistingPageToLinks(int id, AddExistingPageToLinks command)
		{
			return executeCommand(id, command);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("ResetPageLayout")]
		public HttpResponseMessage ResetPageLayout(int id, ResetPageLayout command)
		{
			return executeCommand(id, command);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("AddTemplateContent")]
		public HttpResponseMessage AddTemplateContent(int id, AddTemplateContent command)
		{
			return executeCommand(id, command);
		}

		[HttpPost, Http.PagePermit(Permissions.All), Route("DeleteTemplateContent")]
		public HttpResponseMessage DeleteTemplateContent(int id, DeleteTemplateContent command)
		{
			return executeCommand(id, command);
		}

		/*
		 * await _pageCommandService.ExecuteAsync(command);
		 * return await pageResponse(id);
		 * 
		 * */
		


		private HttpResponseMessage executeCommand(int id, IPageCommand command)
		{
			if (command == null)
			{
				throw new DomainValidationException("Invalid command.");
			}

			command.PageID = id;
			_commandService.Execute(command);

			// return the page in the response
			var page = _pageRep.FindById(id);
			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse(PageDto.FromPage(page));
		}
	}
}
