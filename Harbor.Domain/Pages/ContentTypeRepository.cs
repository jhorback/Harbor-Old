using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ContentTypeRepository : IContentTypeRepository
	{
		List<TemplateContentType> contentTypes;

		public ContentTypeRepository()
		{
			contentTypes = new List<TemplateContentType>
				{
					new ContentTypes.Image(),
					new ContentTypes.PageLink(),
					new ContentTypes.PayPalButton(),
					new ContentTypes.ProductLink(),
					new ContentTypes.Text()
				};
		}

		public List<TemplateContentType> GetPageContentTypes()
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

		public TemplateContentType GetPageContentType(string key)
		{
			throw new NotImplementedException();
		}
	}
}
