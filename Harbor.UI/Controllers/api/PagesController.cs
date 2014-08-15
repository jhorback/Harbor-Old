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
		IPageRepository _pageRep;
		private readonly IPageFactory _pageFactory;

		public PagesController(IPageRepository pageRep, IPageFactory pageFactory)
		{
			_pageRep = pageRep;
			_pageFactory = pageFactory;
		}


		public PagedResultDto<PageDto> Get([FromUri]PageQuery query)
		{
        	query.CurrentUserName = User.Identity.Name;
			return new PagedResultDto<PageDto>
			{
				results = _pageRep.FindAll(query).Select(PageDto.FromPage),
				totalCount = _pageRep.FindAllCount(query)
			};
		}

		[Http.PagePermit(Permissions.Read)]
        public HttpResponseMessage Get(int id)
        {
			var page = _pageRep.FindById(id);
			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse(PageDto.FromPage(page));
        }

		[HttpPost]
		[Http.Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(CreatePageDto page)
        {
			var pageDO = _pageFactory.Create(page.author, page.pageTypeKey, page.title, page.published);
			var errors = DomainObjectValidator.Validate(pageDO);
			
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				pageDO = _pageRep.Create(pageDO);
				_pageRep.Save();
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
			var pageDO = _pageRep.FindById(page.id, readOnly: false);
			if (pageDO == null)
				return Request.CreateNotFoundResponse();

			pageDO = Mapper.Map<PageDto, Page>(page, pageDO);

			var errors = DomainObjectValidator.Validate(pageDO);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);

			try
			{
				pageDO = _pageRep.Update(pageDO);
				_pageRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e.Message);
			}

			return Get(pageDO.PageID);
        }

		[Http.PagePermit(Permissions.Delete)]
		public HttpResponseMessage Delete(int id)
        {
			var pageDO = _pageRep.FindById(id, readOnly: false);
			_pageRep.Delete(pageDO);
			_pageRep.Save();
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
	}
}
