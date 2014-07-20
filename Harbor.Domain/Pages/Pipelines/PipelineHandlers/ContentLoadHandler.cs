using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	public class ContentLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IContentTypeRepository _contentTypeRepository;

		public ContentLoadHandler(IContentTypeRepository contentTypeRepository)
		{
			_contentTypeRepository = contentTypeRepository;
		}

		public void Execute(Page page)
		{
			var headerHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.HeaderKey, page);
			var headerData = headerHandler.GetLayoutContent();
			page.Layout.SetHeaderData(headerData);

			var asideHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.AsideKey, page);
			var asideData = asideHandler.GetLayoutContent();
			page.Layout.SetAsideData(asideData);

			foreach (var item in page.Template.Content)
			{
				var contentHandler = _contentTypeRepository.GetTemplateContentHandler(item.Key);
				var contentData = contentHandler.GetTemplateContent(page, item);
				page.Template.SetContentData(item.Id, contentData);
			}
		}
	}
}
