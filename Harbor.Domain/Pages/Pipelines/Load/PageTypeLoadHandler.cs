using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	public class PageTypeLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;
		private readonly ILogger _logger;

		public PageTypeLoadHandler(IPageTypeRepository pageTypeRepository, ILogger logger)
		{
			_pageTypeRepository = pageTypeRepository;
			_logger = logger;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey, useDefault: true);
			if (pageType != null)
			{
				page.PageType = pageType;
			}
			else
			{
				_logger.Warn("The page type '{0}' could not be found.", page.PageTypeKey);
			}

			var layoutPageType = _pageTypeRepository.GetPageType(page.Layout.PageTypeKey, useDefault: false);
			if (layoutPageType != null)
			{
				layoutPageType.SetLayout(new PageTypeLayoutContext(page));
			}
			else
			{
				_logger.Warn("The page layout page type '{0}' could not be found.", page.Layout.PageTypeKey);				
			}
		}
	}
}
