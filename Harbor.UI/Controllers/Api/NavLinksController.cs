using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.PageNav;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Components;

namespace Harbor.UI.Controllers.Api
{
    public class NavLinksController : ApiController
    {
	    private readonly INavLinksRepository linksRep;

	    public NavLinksController(INavLinksRepository linksRepository)
		{
			linksRep = linksRepository;
		}

	    // GET api/navlinks
		/// <summary>
		/// Returns all NavLinks for the current user.
		/// </summary>
		/// <returns></returns>
        public IEnumerable<NavLinksDto> Get()
        {
            // query.CurrentUserName = User.Identity.Name;
			return linksRep.FindAll(i => i.UserName == User.Identity.Name).Select(i => (NavLinksDto)i);
        }

        // GET api/navlinks/5
        public HttpResponseMessage Get(int id)
        {
            var links = linksRep.FindById(id);
			if (links == null || links.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var linksDto = (NavLinksDto)links;
			return Request.CreateOKResponse(linksDto);
        }

        // POST api/navlinks
		[Permit(UserFeature.Pages, Permissions.Create)]
        public HttpResponseMessage Post(NavLinksDto navLinks)
        {
			var navLinksDO = (NavLinks)navLinks;
			navLinksDO.UserName = User.Identity.Name;

			var errors = DomainObjectValidator.Validate(navLinksDO);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				navLinksDO = linksRep.Create(navLinksDO);
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse((NavLinksDto)navLinksDO);
        }

        // PUT api/navlinks/5
        public HttpResponseMessage Put(NavLinksDto navLinks)
        {
			var navLinksDO = linksRep.FindById(navLinks.id, readOnly: false);

			if (navLinksDO == null || navLinksDO.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			navLinksDO = Mapper.Map(navLinks, navLinksDO);

			try
			{
				navLinksDO = linksRep.Update(navLinksDO);
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}
			
			var navLinksDto = (NavLinksDto)navLinksDO;
			return Request.CreateOKResponse(navLinksDto);
        }

        // DELETE api/navlinks/5
        public HttpResponseMessage Delete(int id)
        {
			var navLinksDO = linksRep.FindById(id);
			if (navLinksDO != null && navLinksDO.UserName == User.Identity.Name)
			{
				linksRep.Delete(navLinksDO);
			}
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
