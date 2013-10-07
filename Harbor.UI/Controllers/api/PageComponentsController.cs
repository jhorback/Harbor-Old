using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Harbor.Domain.Pages;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class PageComponentsController : ApiController
    {
		IComponentRepository compRep;

		public PageComponentsController(IComponentRepository compRep)
		{
			this.compRep = compRep;
		}

		public IEnumerable<PageComponentDto> Get()
		{
			return compRep.GetAllComponents().Select(pt => (PageComponentDto)pt);
		}
    }
}