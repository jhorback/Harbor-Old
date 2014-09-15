using System.Collections.Generic;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class PageComponentsController : ApiController
    {
	    private readonly IContentTypeRepository _contentTypeRepository;

		public PageComponentsController(IContentTypeRepository contentTypeRepository)
		{
			_contentTypeRepository = contentTypeRepository;
		}

		public IEnumerable<PageComponentDto> Get(string parentPageTypeKey = null)
		{
			var contentTypes = _contentTypeRepository.GetTemplateContentTypes(parentPageTypeKey);
			foreach (var type in contentTypes["primary"])
			{
				yield return PageComponentDto.FromPageContentType(type, isPrimaryToAdd: true);
			}

			foreach (var type in contentTypes["other"])
			{
				yield return PageComponentDto.FromPageContentType(type, isPrimaryToAdd: false);
			}
		}
    }
}