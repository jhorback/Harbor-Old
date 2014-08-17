using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	public class PageTypeLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeLoadHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.Layout.PageTypeKey, useDefault: false);
			if (pageType != null)
			{
				page.PageType.SetLayout(new PageTypeLayoutContext(page));				
			}
		}
	}
}
