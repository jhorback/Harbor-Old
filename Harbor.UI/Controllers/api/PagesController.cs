using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Queries;
using Harbor.Domain.Query;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models;
using PageQuery = Harbor.Domain.Pages.PageQuery;

namespace Harbor.UI.Controllers.Api
{
	[Authorize, RoutePrefix("api/pages")]
    public class PagesController : ApiController
    {
		IPageRepository _pageRep;
		private readonly IPageFactory _pageFactory;
		private readonly IQueryService _queryService;

		public PagesController(
			IPageRepository pageRep,
			IPageFactory pageFactory,
			IQueryService queryService
			)
		{
			_pageRep = pageRep;
			_pageFactory = pageFactory;
			_queryService = queryService;
		}

		[HttpGet, Route("")]
		public PagedResultDto<PageDto> Get([FromUri]PageQuery query)
		{
        	query.CurrentUserName = User.Identity.Name;
			return new PagedResultDto<PageDto>
			{
				results = _pageRep.FindAll(query).Select(PageDto.FromPage),
				totalCount = _pageRep.FindAllCount(query)
			};
		}

		[HttpGet, Route("{id:int}")]
		[Http.PagePermit(Permissions.Read)]
        public HttpResponseMessage Get(int id)
        {
			var pageQueryParams = new PageQueryParams { PageID = id };
			var page = _queryService.GetQuery<IPageQuery>().ExecuteFromCache(pageQueryParams);

			if (page == null)
				return Request.CreateNotFoundResponse();

			return Request.CreateOKResponse(PageDto.FromPage(page));
        }

		[HttpPost, Route("")]
		[Http.Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(CreatePageDto page)
		{
			page.author = User.Identity.Name;
			var pageDO = _pageFactory.Create(page.author, page.pageTypeKey, page.title, page.published);
			var errors = DomainObjectValidator.Validate(pageDO);
			
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				pageDO = _pageRep.Create(pageDO);
				_pageRep.Save();

				// add the parent page id to the layout if null
				if (pageDO.Layout.ParentPageID == null)
				{
					pageDO.Layout.ParentPageID = pageDO.PageID;
					_pageRep.Save();
				}
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse(PageDto.FromPage(pageDO));
        }

		[HttpPut, Route("{id:int}")]
		[Http.PagePermit(Permissions.Update)]
		public HttpResponseMessage Put(PageDto page)
		{
			var pageDO = _pageRep.FindById(page.id);
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

		[HttpDelete, Route("{id:int}")]
		[Http.PagePermit(Permissions.Delete)]
		public HttpResponseMessage Delete(int id)
        {
			var pageDO = _pageRep.FindById(id);


			var returnToPath = "~/";
			var firstPageWithSharedLayout = _pageRep.Query().FirstOrDefault(p => p.PageLayoutID == pageDO.PageLayoutID && p.PageID != pageDO.PageID);
			if (firstPageWithSharedLayout != null)
			{
				returnToPath = firstPageWithSharedLayout.VirtualPath;
			}

			_pageRep.Delete(pageDO);
			_pageRep.Save();

			var returnToUrl = VirtualPathUtility.ToAbsolute(returnToPath);
			return Request.CreateResponse(HttpStatusCode.OK, returnToUrl);
        }
	}
}
