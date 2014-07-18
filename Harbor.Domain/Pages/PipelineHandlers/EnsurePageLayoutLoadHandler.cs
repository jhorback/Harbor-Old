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

		public EnsurePageLayoutLoadHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			if (page.Layout != null && page.Layout.PageLayoutID != 0)
			{
				return;
			}

			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey, useDefault: true);
			if (pageType == null)
			{
				throw new Exception("A page type could not be determined for the page. PageID: " + page.PageID);
			}

			page.Layout = page.Layout ?? new PageLayout();
			pageType.SetLayout(new PageTypeLayoutContext(page));
			page.Layout.UserName = page.AuthorsUserName;
			page.Layout.Title = page.Title;
		}
	}
}
