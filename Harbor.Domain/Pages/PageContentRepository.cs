using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public class PageContentRepository : IPageContentRepository
	{
		private readonly IPageContentTypeRepository _contentTypeRepository;
		private readonly IObjectFactory _objectFactory;

		public PageContentRepository(IPageContentTypeRepository contentTypeRepository, IObjectFactory objectFactory)
		{
			_contentTypeRepository = contentTypeRepository;
			_objectFactory = objectFactory;
		}

		public PageContent GetContent(string key, Page page, string uicid)
		{
			var componentType = _contentTypeRepository.GetTypeOfPageContentType(key);
			if (componentType == null)
				return null;

			return _objectFactory.GetInstance(componentType, new
			{
				"page" = page,
				"uicid" = uicid
			}) as PageContent;
		}

		public T GetContent<T>(Page page, string uicid) where T : PageContent
		{
			var content = _objectFactory.GetInstance<T>(new
			{
				"page" = page,
				"uicid" = uicid
			});
			return content;
		}
	}
}
