using System;
using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public class PageComponentRepository : IPageComponentRepository
	{
		List<PageComponent> components;

		public List<PageComponent> GetAllComponents()
		{
			return components;
		}

		public PageComponentRepository(List<PageComponent> components)
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

		public PageComponent GetComponent(string key)
		{
			throw new NotImplementedException();
		}
	}
}
