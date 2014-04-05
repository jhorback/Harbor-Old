using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageContentTypeRepository : IPageContentTypeRepository
	{
		List<PageContentType> contentTypes;

		public PageContentTypeRepository()
		{
			contentTypes = new List<PageContentType>
				{
					new ContentTypes.Image(),
					new ContentTypes.PageLink(),
					new ContentTypes.PayPalButton(),
					new ContentTypes.ProductLink(),
					new ContentTypes.Text()
				};
		}

		public List<PageContentType> GetPageContentTypes()
		{
			return contentTypes;
		}

		public Type GetTypeOfPageContentType(string key)
		{
			var componentType = this.contentTypes.FirstOrDefault(c => c.Key == key);
			if (componentType == null)
			{
				return null;
			}

			var type = componentType.PageComponent;
			return type;
		}

		public PageContentType GetPageContentType(string key)
		{
			throw new NotImplementedException();
		}
	}
}
