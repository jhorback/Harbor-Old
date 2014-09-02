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
using Harbor.UI.Models.Products;

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
			return buttonRep.FindAll(i => i.UserName == User.Identity.Name).Select(PayPalButtonDto.FromPayPalButton);
        }

        // GET api/navlinks/5
        public HttpResponseMessage Get(int id)
        {
            var buttons = buttonRep.FindById(id);
			if (buttons == null || buttons.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var dto = PayPalButtonDto.FromPayPalButton(buttons);
			return Request.CreateOKResponse(dto);
        }

        // POST api/navlinks
		[Permit(UserFeature.Pages, Permissions.Create)]
		public HttpResponseMessage Post(PayPalButtonDto dto)
		{
			var dobj = PayPalButtonDto.ToPayPalButton(dto);
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

			return Request.CreateOKResponse(PayPalButtonDto.FromPayPalButton(dobj));
        }

        // PUT api/navlinks/5
		public HttpResponseMessage Put(PayPalButtonDto dto)
        {
			var dobj = buttonRep.FindById(dto.id ?? 0, readOnly: false);

			if (dobj == null || dobj.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			PayPalButtonDto.ToPayPalButton(dobj, dto);

			try
			{
				dobj = buttonRep.Update(dobj);
				buttonRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}

			var navLinksDto = PayPalButtonDto.FromPayPalButton(dobj);
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
