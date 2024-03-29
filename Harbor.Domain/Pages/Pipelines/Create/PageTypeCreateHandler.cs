﻿using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Create
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
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey, useDefault: true);
			if (pageType == null)
			{
				throw new DomainValidationException("Pages cannot be created without a page type.");				
			}


			// setup the layout if new
			if (page.Layout == null || page.Layout.IsNew())
			{
				page.Layout = new PageLayout
				{
					Title = page.Title,
					UserName = page.AuthorsUserName,
					PageTypeKey = page.PageTypeKey
				};
				pageType.SetLayout(new PageTypeLayoutContext(page));
			}


			// setup the page template
			pageType.SetTemplate(new PageTypeTemplateContext(page));
		
			
			// allow any specialized handling
			pageType.OnPageCreate(page);
		}
	}
}
