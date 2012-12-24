using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
	[Authorize]
    public class PagesController : ApiController
    {
		IPageRepository pageRep;

		public PagesController(IPageRepository pageRep)
		{
			this.pageRep = pageRep;
		}

		// use odata here?
        public IEnumerable<PageDto> Get(string title = null, string author = null)
		{
			var pages = pageRep.FindAll();
			if (string.IsNullOrEmpty(title) == false)
				pages = pages.Where(p => p.Title.Contains(title));

			if (string.IsNullOrEmpty(author) == false)
				pages = pages.Where((p => p.AuthorsUserName == author));

        	var currentUser = User.Identity.Name;
			pages = pages.Where(p => p.HasPermission(currentUser,
				PageFunctionalArea.Page, Permissions.Read));
			;
			pages = pages.OrderByDescending(p => p.Modified);

			return pages.Select(p => (PageDto)p);
		}

		[Http.PagePermit(Permissions.Read)]
        public HttpResponseMessage Get(int id)
        {
			var page = pageRep.FindById(id);
			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse((PageDto)page);
        }

		[Http.Permit(UserFunctionalArea.Pages, Permissions.Create)]
		public HttpResponseMessage Post(PageDto page)
        {
			var pageDO = (Page)page;
			if (pageDO == null)
				return Request.CreateBadRequestResponse("The page posted was null.");

			var errors = DomainObjectValidator.Validate(pageDO);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				pageDO = pageRep.Create(pageDO);
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse((PageDto)pageDO);
        }

		[Http.PagePermit(Permissions.Update)]
		public HttpResponseMessage Put(PageDto page)
		{
			var pageDO = pageRep.FindById(page.id, readOnly: false);
			if (pageDO == null)
				return Request.CreateNotFoundResponse();

			pageDO = Mapper.Map<PageDto, Page>(page, pageDO);

			var errors = DomainObjectValidator.Validate(pageDO);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);

			try
			{
				pageDO = pageRep.Update(pageDO);
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e.Message);
			}
			
			var userDto = (PageDto)pageDO;
			return Request.CreateOKResponse(userDto);
        }

		[Http.PagePermit(Permissions.Delete)]
		public HttpResponseMessage Delete(int id)
        {
			var pageDO = pageRep.FindById(id, readOnly: false);
			pageRep.Delete(pageDO);
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
