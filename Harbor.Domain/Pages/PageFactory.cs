using System;

namespace Harbor.Domain.Pages
{
	public class PageFactory : IPageFactory
	{
		private readonly PageCreatePipeline _pageCreatePipeline;
		private readonly IPageLayoutRepository _pageLayoutRepository;

		public PageFactory(
			PageCreatePipeline pageCreatePipeline,
			IPageLayoutRepository pageLayoutRepository
			)
		{
			_pageCreatePipeline = pageCreatePipeline;
			_pageLayoutRepository = pageLayoutRepository;
		}

		public Page Create(string userName, string pageTypeKey, string title, bool publish)
		{
			var page = createBasicPage(userName, pageTypeKey, title, publish);
			_pageCreatePipeline.Execute(page);
			return page;
		}

		public Page Create(string userName, string pageTypeKey, string title, bool publish, int pageLayoutId)
		{
			var pageLayout = _pageLayoutRepository.FindById(pageLayoutId);
			var page = createBasicPage(userName, pageTypeKey, title, publish);

			page.PageLayoutID = pageLayout.PageLayoutID;
			page.Layout = pageLayout;
			
			_pageCreatePipeline.Execute(page);
			return page;
		}

		Page createBasicPage(string userName, string pageTypeKey, string title, bool publish)
		{
			var page = new Page
			    {
			        AuthorsUserName = userName,
					PageTypeKey = pageTypeKey,
			        Title = title,
			        Public = publish,
			        Created = DateTime.Now,
			        Modified = DateTime.Now,
					Enabled = true
			    };
			return page;
		}
	}
}
