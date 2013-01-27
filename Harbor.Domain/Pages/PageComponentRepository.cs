using System;
using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public class PageComponentRepository : IPageComponentRepository
	{
		List<PageComponentType> components;

		public List<PageComponentType> GetAllComponents()
		{
			return components;
		}

		public PageComponentRepository(List<PageComponentType> components)
		{
			this.components = components;
		}

		public List<HeaderComponent> GetHeaderComponents()
		{
			throw new NotImplementedException();
		}

		public List<AsideComponent> GetAsideComponents()
		{
			throw new NotImplementedException();
		}

		public List<ContentComponent> GetContentComponents()
		{
			throw new NotImplementedException();
		}

		public PageComponentType GetComponent(string key)
		{
			throw new NotImplementedException();
		}
	}
}
