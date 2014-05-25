using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class SetPageTypeLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public SetPageTypeLoadHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			page.PageType = _pageTypeRepository.GetPageType((page.PageTypeKey));
		}
	}
}
