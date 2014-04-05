using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.Content;

namespace Harbor.Domain.Pages
{
	public class PageContentRepository : IPageContentRepository
	{
		private readonly IPageContentTypeRepository _componentRepository;

		private delegate PageContent PageComponentFactory(Type type, Page page, string uicid);

		private PageContent defaultFactory(Type type, Page page, string uicid)
		{
			var comp = Activator.CreateInstance(type, page, uicid);
			return comp as PageContent;
		}

		private readonly IDictionary<Type, PageComponentFactory> factories;


		public PageContentRepository(IPageContentTypeRepository componentRepository, Func<IPageRepository> getPageRepository)
		{
			_componentRepository = componentRepository;

			factories = new Dictionary<Type, PageComponentFactory>
			{
				{ typeof (ProductLink), (type, page, uicid) => new ProductLink(getPageRepository(), page, uicid) }
			};
		}


		public PageContent GetContent(string key, Page page, string uicid)
		{
			var componentType = _componentRepository.GetTypeOfPageContentType(key);
			if (componentType == null)
				return null;

			var comp = createComponent(componentType, page, uicid);
			return comp as PageContent;
		}


		public T GetContent<T>(Page page, string uicid) where T : PageContent
		{
			var comp = createComponent(typeof(T), page, uicid);
			// var comp = (T)Activator.CreateInstance(typeof(T), this, uicid);
			return comp as T;
		}

		PageContent createComponent(Type type, Page page, string uicid)
		{
			var factory = factories.ContainsKey(type) ? factories[type] : defaultFactory;
			var comp = factory(type, page, uicid);
			return comp;
		}
	}
}
