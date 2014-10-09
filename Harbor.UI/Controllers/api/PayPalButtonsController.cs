using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Harbor.Domain;
using Harbor.Domain.Products;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Products;

// JCH! - review permissions here, consider creating a permit attribute for paypalbuttons.

namespace Harbor.UI.Controllers.Api
{
	[RoutePrefix("api/paypalbuttons")]
    public class PayPalButtonsController : ApiController
    {
	    private readonly IPayPalButtonRepository _buttonRep;

		public PayPalButtonsController(IPayPalButtonRepository buttonRep)
		{
			_buttonRep = buttonRep;
		}

		/// <summary>
		/// Returns all PayPalButtons for the current user.
		/// </summary>
		/// <returns></returns>
		[HttpGet, Route("")]
        public IEnumerable<PayPalButtonDto> Get()
        {
            // query.CurrentUserName = User.Identity.Name;
			return _buttonRep.FindAll(i => i.UserName == User.Identity.Name).Select(PayPalButtonDto.FromPayPalButton);
        }


		[HttpGet, Route("{id:int}")]
        public HttpResponseMessage Get(int id)
        {
            var buttons = _buttonRep.FindById(id);
			if (buttons == null || buttons.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			var dto = PayPalButtonDto.FromPayPalButton(buttons);
			return Request.CreateOKResponse(dto);
        }

        [HttpPost, Route("")]
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
				dobj = _buttonRep.Create(dobj);
				_buttonRep.Save();
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse(PayPalButtonDto.FromPayPalButton(dobj));
        }

		[HttpPut, Route("{id:int}")]
		public HttpResponseMessage Put(PayPalButtonDto dto)
        {
			var dobj = _buttonRep.FindById(dto.id ?? 0, readOnly: false);

			if (dobj == null || dobj.UserName != User.Identity.Name)
				return Request.CreateNotFoundResponse();

			PayPalButtonDto.ToPayPalButton(dobj, dto);

			try
			{
				dobj = _buttonRep.Update(dobj);
				_buttonRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}

			var navLinksDto = PayPalButtonDto.FromPayPalButton(dobj);
			return Request.CreateOKResponse(navLinksDto);
        }

		[HttpDelete, Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
			var dobj = _buttonRep.FindById(id);
			if (dobj != null && dobj.UserName == User.Identity.Name)
			{
				_buttonRep.Delete(dobj);
				_buttonRep.Save();
			}
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
