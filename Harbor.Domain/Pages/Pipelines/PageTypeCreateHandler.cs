using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageTypeCreateHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;
		private readonly ILogger _logger;

		public PageTypeCreateHandler(IPageTypeRepository pageTypeRepository, ILogger logger)
		{
			_pageTypeRepository = pageTypeRepository;
			_logger = logger;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey);
			if (pageType == null)
			{
				pageType = _pageTypeRepository.GetPageType("page");
				_logger.Warn("Page type could not be found: {0}.", page.PageTypeKey);
			}
			if (pageType == null)
			{
				throw new DomainValidationException("Pages cannot be created without a page type.");				
			}

			var creationContext = new PageTypeCreationContext(page);
			pageType.OnPageCreate(creationContext);
		}
	}
}
