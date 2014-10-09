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
	[RoutePrefix("api/pagelayout")]
    public class PageLayoutController : ApiController
    {
	    private readonly IPageLayoutRepository linksRep;
	    private readonly IDtoMapper _dtoMapper;

	    public PageLayoutController(IPageLayoutRepository linksRepository, IDtoMapper dtoMapper)
	    {
		    linksRep = linksRepository;
		    _dtoMapper = dtoMapper;
	    }


	    [HttpGet, Route("")]
        public IEnumerable<PageLayoutDto> Get()
        {
            // query.CurrentUserName = User.Identity.Name;
			return linksRep.FindAll(i => i.UserName == User.Identity.Name).Select(p => PageLayoutDto.FromPageLayout(p, _dtoMapper));
        }


		[HttpGet, Route("{id:int}")]
        public HttpResponseMessage Get(int id)
        {
            var links = linksRep.FindById(id);
			if (links == null || links.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var layoutDto = PageLayoutDto.FromPageLayout(links, _dtoMapper);
			return Request.CreateOKResponse(layoutDto);
        }


		[HttpPut, Route("{id:int}")]
		public HttpResponseMessage Put(PageLayoutDto navLinks)
        {
			var navLinksDO = linksRep.FindById(navLinks.id, readOnly: false);

			if (navLinksDO == null || navLinksDO.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			navLinksDO = Mapper.Map(navLinks, navLinksDO);

			try
			{
				navLinksDO = linksRep.Update(navLinksDO);
				linksRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}

			var navLinksDto = PageLayoutDto.FromPageLayout(navLinksDO, _dtoMapper);
			return Request.CreateOKResponse(navLinksDto);
        }

        
		[HttpDelete, Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
			var navLinksDO = linksRep.FindById(id);
			if (navLinksDO != null && navLinksDO.UserName == User.Identity.Name)
			{
				linksRep.Delete(navLinksDO);
				linksRep.Save();
			}
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
