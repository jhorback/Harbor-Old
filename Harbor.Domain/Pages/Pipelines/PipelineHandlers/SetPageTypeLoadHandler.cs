﻿using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
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
			page.PageType = _pageTypeRepository.GetPageType(page.PageTypeKey, useDefault: true);
			if (page.PageType != null)
			{
				page.PageType.SetLayout(new PageTypeLayoutContext(page));				
			}
		}
	}
}