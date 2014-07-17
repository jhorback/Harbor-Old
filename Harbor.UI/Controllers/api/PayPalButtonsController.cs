using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.Products;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Content;

namespace Harbor.UI.Controllers.Api
{
    public class PayPalButtonsController : ApiController
    {
	    private readonly IPayPalButtonRepository buttonRep;

		public PayPalButtonsController(IPayPalButtonRepository linksRepository)
		{
			buttonRep = linksRepository;
		}

	    // GET api/navlinks
		/// <summary>
		/// Returns all NavLinks for the current user.
		/// </summary>
		/// <returns></returns>
        public IEnumerable<PayPalButtonDto> Get()
        {
            // query.CurrentUserName = User.Identity.Name;
			return buttonRep.FindAll(i => i.UserName == User.Identity.Name).Select(i => (PayPalButtonDto)i);
        }

        // GET api/navlinks/5
        public HttpResponseMessage Get(int id)
        {
            var buttons = buttonRep.FindById(id);
			if (buttons == null || buttons.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var dto = (PayPalButtonDto)buttons;
			return Request.CreateOKResponse(dto);
        }

        // POST api/navlinks
		[Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(PayPalButtonDto dto)
        {
			var dobj = (PayPalButton)dto;
			dobj.UserName = User.Identity.Name;

			var errors = DomainObjectValidator.Validate(dobj);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				dobj = buttonRep.Create(dobj);
				buttonRep.Save();
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse((PayPalButtonDto)dobj);
        }

        // PUT api/navlinks/5
		public HttpResponseMessage Put(PayPalButtonDto dto)
        {
			var dobj = buttonRep.FindById(dto.id, readOnly: false);

			if (dobj == null || dobj.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			dobj = Mapper.Map(dto, dobj);

			try
			{
				dobj = buttonRep.Update(dobj);
				buttonRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}

			var navLinksDto = (PayPalButtonDto)dobj;
			return Request.CreateOKResponse(navLinksDto);
        }

        // DELETE api/navlinks/5
        public HttpResponseMessage Delete(int id)
        {
			var dobj = buttonRep.FindById(id);
			if (dobj != null && dobj.UserName == User.Identity.Name)
			{
				buttonRep.Delete(dobj);
				buttonRep.Save();
			}
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
