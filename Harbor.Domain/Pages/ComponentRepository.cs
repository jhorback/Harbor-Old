using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ComponentRepository : IComponentRepository
	{
		List<ComponentType> components;

		public List<ComponentType> GetAllComponents()
		{
			return components;
		}

		public ComponentRepository(List<ComponentType> components)
		{
			this.components = components;
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

		public ComponentType GetComponent(string key)
		{
			throw new NotImplementedException();
		}
	}
}
