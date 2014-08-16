
namespace Harbor.Domain.Pages.Commands
{
	public class UseNewPageLayout : IPageCommand
	{
		public int PageID { get; set; }
	}

	public class UseNewPageLayoutHandler : IPageCommandHandler<UseNewPageLayout>
	{
		private readonly IPageRepository _pageRepository;

		public UseNewPageLayoutHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Execute(UseNewPageLayout command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);

			page.PageLayoutID = 0;
			page.Layout = new PageLayout
			{
				Title = page.Title,
				UserName = page.AuthorsUserName
			};

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
