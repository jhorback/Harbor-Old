using System.Collections.Generic;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
	[RoutePrefix("api/pagetypes")]
    public class PageTypesController : ApiController
    {
		IPageTypeRepository _pageTypeRep;

		public PageTypesController(IPageTypeRepository pageTypeRep)
		{
			_pageTypeRep = pageTypeRep;
		}

		[HttpGet, Route("")]
		public IEnumerable<PageTypeDto> Get(string parentPageTypeKey = null)
		{
			var pageTypes = _pageTypeRep.GetPageTypesToAdd(parentPageTypeKey);
			var addingToParent = !string.IsNullOrEmpty(parentPageTypeKey);
			foreach (var type in pageTypes["primary"])
			{
				yield return PageTypeDto.FromPageType(type, isPrimaryToAdd: true, addingToParent: addingToParent);
			}

			foreach (var type in pageTypes["other"])
			{
				yield return PageTypeDto.FromPageType(type, isPrimaryToAdd: false, addingToParent: addingToParent);
			}
		}
    }
}