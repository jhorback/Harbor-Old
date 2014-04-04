using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageTypeCreateHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeCreateHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey);
			var creationContext = new PageTypeCreationContext(page);
			pageType.OnPageCreate(creationContext);
		}
	}
}
