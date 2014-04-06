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
		private readonly IPageFactory _pageFactory;

		public PagesController(IPageRepository pageRep, IPageFactory pageFactory)
		{
			this.pageRep = pageRep;
			_pageFactory = pageFactory;
		}


		public PagedResultDto<PageDto> Get([FromUri]PageQuery query)
		{
        	query.CurrentUserName = User.Identity.Name;
			return new PagedResultDto<PageDto>
			{
				results = pageRep.FindAll(query).Select(PageDto.FromPage),
				totalCount = pageRep.FindAllCount(query)
			};
		}

		[Http.PagePermit(Permissions.Read)]
        public HttpResponseMessage Get(int id)
        {
			var page = pageRep.FindById(id);
			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse(PageDto.FromPage(page));
        }

		[Http.Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(string author, string pageTypeKey, string title, bool published)
        {
			var pageDO = _pageFactory.Create(author, pageTypeKey, title, published);
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

			return Request.CreateOKResponse(PageDto.FromPage(pageDO));
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
			
			var pageDto = PageDto.FromPage(pageDO);
			return Request.CreateOKResponse(pageDto);
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
