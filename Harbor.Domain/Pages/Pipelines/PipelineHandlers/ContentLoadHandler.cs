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
			var headerHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.HeaderKey);
			var headerData = headerHandler.GetLayoutContent(page, page.Layout.Header, page.Layout.HeaderDataStr);
			page.Layout.SetHeaderData(headerData);

			var asideHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.AsideKey);
			var asideData = asideHandler.GetLayoutContent(page, page.Layout.Aside, page.Layout.AsideDataStr);
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
