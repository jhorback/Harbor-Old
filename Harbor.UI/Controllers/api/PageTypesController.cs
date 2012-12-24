using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class PageTypesController : ApiController
    {
		IPageTypeRepository pageTypeRep;

		public PageTypesController(IPageTypeRepository pageTypeRep)
		{
			this.pageTypeRep = pageTypeRep;
		}

		public IEnumerable<PageTypeDto> Get()
		{
			return pageTypeRep.GetPageTypes().Select(pt => (PageTypeDto)pt);
		}
    }
}