using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class PageComponentsController : ApiController
    {
		IContentTypeRepository compRep;

		public PageComponentsController(IContentTypeRepository compRep)
		{
			this.compRep = compRep;
		}

		public IEnumerable<PageComponentDto> Get()
		{
			return compRep.GetTemplateContentTypes().Select(PageComponentDto.FromPageContentType);
		}
    }
}