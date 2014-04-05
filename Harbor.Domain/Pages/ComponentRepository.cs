using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ComponentRepository : IComponentRepository
	{
		List<PageContentType> components;

		public ComponentRepository()
		{
			components = new List<PageContentType>
				{
					new ContentTypes.Image(),
					new ContentTypes.Links(),
					new ContentTypes.PageLink(),
					new ContentTypes.PayPalButton(),
					new ContentTypes.ProductLink(),
					new ContentTypes.Text(),
					new ContentTypes.Title()
				};
		}

		public List<PageContentType> GetAllComponents()
		{
			return components;
		}

		public Type GetPageComponentType(string key)
		{
			var componentType = this.components.FirstOrDefault(c => c.Key == key);
			if (componentType == null)
			{
				return null;
			}

			var type = componentType.PageComponent;
			return type;
		}

		public List<PageContentType> GetContentComponents()
		{
			throw new NotImplementedException();
		}

		public PageContentType GetComponent(string key)
		{
			throw new NotImplementedException();
		}
	}
}
