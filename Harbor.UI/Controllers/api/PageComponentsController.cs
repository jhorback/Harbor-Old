using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class PageComponentsController : ApiController
    {
		IPageContentTypeRepository compRep;

		public PageComponentsController(IPageContentTypeRepository compRep)
		{
			this.compRep = compRep;
		}

		public IEnumerable<PageComponentDto> Get()
		{
			return compRep.GetPageContentTypes().Select(pt => (PageComponentDto)pt);
		}
    }
}