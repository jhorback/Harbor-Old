using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageComponents;

namespace Harbor.Domain.Pages
{
	public class PageComponentRepository : IPageComponentRepository
	{
		private readonly IComponentRepository _componentRepository;

		private delegate PageComponent PageComponentFactory(Type type, Page page, string uicid);

		private PageComponent defaultFactory(Type type, Page page, string uicid)
		{
			var comp = Activator.CreateInstance(type, page, uicid);
			return comp as PageComponent;
		}

		private readonly IDictionary<Type, PageComponentFactory> factories;


		public PageComponentRepository(IComponentRepository componentRepository, Func<IPageRepository> getPageRepository)
		{
			_componentRepository = componentRepository;

			factories = new Dictionary<Type, PageComponentFactory>
			{
				{ typeof (ProductLink), (type, page, uicid) => new ProductLink(getPageRepository(), page, uicid) }
			};
		}


		public PageComponent GetComponent(string key, Page page, string uicid)
		{
			var componentType = _componentRepository.GetPageComponentType(key);
			if (componentType == null)
				return null;

			var comp = createComponent(componentType, page, uicid);
			return comp as PageComponent;
		}


		public T GetComponent<T>(Page page, string uicid) where T : PageComponent
		{
			var comp = createComponent(typeof(T), page, uicid);
			// var comp = (T)Activator.CreateInstance(typeof(T), this, uicid);
			return comp as T;
		}


		PageComponent createComponent(Type type, Page page, string uicid)
		{
			var factory = factories.ContainsKey(type) ? factories[type] : defaultFactory;
			var comp = factory(type, page, uicid);
			return comp;
		}
	}
}
