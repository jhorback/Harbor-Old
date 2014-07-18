using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	// jch! testing
	public class SetContentLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public SetContentLoadHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{

			/*
			var handler = _contentTypeRepository.GetContentType(page.Layout.HeaderKey)
			
			
			page.Layout.Header = handler.GetContent(page);
			page.Layout.HeaderKey;
			page.Layout.HeaderData;
			 */
			// page.Template.Content[0].

		}
	}
}
