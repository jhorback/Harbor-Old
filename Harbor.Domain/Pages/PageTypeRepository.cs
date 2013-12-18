using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Harbor.Domain.Pages.PageTypes;

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

			init();
		}

		void init()
		{
			foreach (var type in pageTypes)
			{
				var context = new PageTypeContext(type);
				type.Template = context.Template;
			}
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
