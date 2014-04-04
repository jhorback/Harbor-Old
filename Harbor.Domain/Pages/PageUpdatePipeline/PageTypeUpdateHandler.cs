using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageTypeUpdateHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeUpdateHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey);
			pageType.OnPageUpdate(new PageTypeUpdateContext(page));
		}
	}
}
