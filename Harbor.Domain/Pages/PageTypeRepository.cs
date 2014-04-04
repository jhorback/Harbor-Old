using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageTypeRepository : IPageTypeRepository
	{
		List<PageType> pageTypes;

		public PageTypeRepository()
		{
			pageTypes = new List<PageType>
				{
					new PageTypes.PageListing(),
					new PageTypes.Page(),
					new PageTypes.Article(),
					new PageTypes.Product()
				};
		}

		public IEnumerable<PageType> GetPageTypes()
		{
			return pageTypes;
		}

		public PageType GetPageType(string key)
		{
			return pageTypes.FirstOrDefault(pt => pt.Key == key);
		}
	}
}
