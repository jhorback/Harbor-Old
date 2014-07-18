using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageTypeRepository : IPageTypeRepository
	{
		List<PageType> pageTypes;

		private const string DefaultPageTypeKey = "page";

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

		public PageType GetPageType(string key, bool useDefault = false)
		{
			var pageType = pageTypes.FirstOrDefault(pt => pt.Key == key);
			if (pageType == null && useDefault == true)
			{
				pageType = pageTypes.FirstOrDefault(pt => pt.Key == DefaultPageTypeKey);
			}
			return pageType;
		}
	}
}
