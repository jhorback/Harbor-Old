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
			// determine the page type
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


			// setup the layout if new
			if (page.Layout.IsNew())
			{
				page.Layout.Title = page.Title;
				page.Layout.UserName = page.AuthorsUserName;
				pageType.SetLayout(new PageTypeLayoutContext(page));
			}


			// setup the page template
			pageType.SetTemplate(new PageTypeTemplateContext(page));
		
			
			// allow any specialized handling
			pageType.OnPageCreate(page);
		}
	}
}
