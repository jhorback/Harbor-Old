using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
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
			if (pageType != null)
			{
				pageType.OnPageUpdate(page);
			}

			// ensure the parent page id (lazy migration)
			if (page.Layout.ParentPageID == null && page.Layout.Title == page.Title)
			{
				page.Layout.ParentPageID = page.PageID;
			}
		}
	}
}
