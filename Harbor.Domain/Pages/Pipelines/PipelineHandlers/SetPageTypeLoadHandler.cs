using System;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	[Obsolete("This was overriding shared layouts. The ensure layout handler should be enough.")]
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
