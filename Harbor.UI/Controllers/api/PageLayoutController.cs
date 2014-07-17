using System;
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
using Harbor.UI.Models.Pages;

namespace Harbor.UI.Controllers.Api
{
    public class PageLayoutController : ApiController
    {
	    private readonly IPageLayoutRepository linksRep;

	    public PageLayoutController(IPageLayoutRepository linksRepository)
		{
			linksRep = linksRepository;
		}

	    // GET api/navlinks
		/// <summary>
		/// Returns all NavLinks for the current user.
		/// </summary>
		/// <returns></returns>
        public IEnumerable<PageLayoutDto> Get()
        {
            // query.CurrentUserName = User.Identity.Name;
			return linksRep.FindAll(i => i.UserName == User.Identity.Name).Select(PageLayoutDto.FromPageLayout);
        }

        // GET api/navlinks/5
        public HttpResponseMessage Get(int id)
        {
            var links = linksRep.FindById(id);
			if (links == null || links.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var linksDto = PageLayoutDto.FromPageLayout(links);
			return Request.CreateOKResponse(linksDto);
        }

        // POST api/navlinks
		[Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(PageLayoutDto navLinks)
        {
			throw new NotImplementedException();
			//var navLinksDO = PageLayoutDto.ToPageLayout(navLinks);
			//navLinksDO.UserName = User.Identity.Name;

			//var errors = DomainObjectValidator.Validate(navLinksDO);
			//if (errors.Count != 0)
			//	return Request.CreateBadRequestResponse(errors);
			
			//try
			//{
			//	navLinksDO = linksRep.Create(navLinksDO);
			//}
			//catch (DomainValidationException exception)
			//{
			//	return Request.CreateBadRequestResponse(exception.Message);
			//}

			//return Request.CreateOKResponse(PageLayoutDto.FromPageLayout(navLinksDO));
        }

        // PUT api/navlinks/5
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

			var navLinksDto = PageLayoutDto.FromPageLayout(navLinksDO);
			return Request.CreateOKResponse(navLinksDto);
        }

        // DELETE api/navlinks/5
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
