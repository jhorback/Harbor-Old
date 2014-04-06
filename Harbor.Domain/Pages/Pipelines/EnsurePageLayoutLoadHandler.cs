using System;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// If there is not a page layout entity, tries to load it using the PageTypeKey 
	/// or uses the default key "page". 
	/// </summary>
	public class EnsurePageLayoutLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;
		private const string DefaultPageTypeKey = "page";

		public EnsurePageLayoutLoadHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			if (page.Layout != null)
			{
				return;
			}

			var pageTypeKey = page.PageTypeKey ?? DefaultPageTypeKey;
			var pageType = _pageTypeRepository.GetPageType(pageTypeKey)
				?? _pageTypeRepository.GetPageType(DefaultPageTypeKey);

			if (pageType == null)
			{
				throw new Exception("A page type could not be determined for the page. PageID: " + page.PageID);
			}

			// the page load context overrides the add content methods
			pageType.OnPageCreate(new PageTypeLoadContext(page));
		}
	}
}
